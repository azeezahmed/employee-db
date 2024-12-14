import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from "@angular/material/core";
import { DateRange, MatCalendar, MatCalendarUserEvent } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { Moment } from "moment";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'date-picker-header',
    styles: [
        `
      .header {
        display: flex;
        align-items: center;
        margin: 21px;
        justify-content: center;
        gap: 3px;
        font-size: 18px;

            &.header-buttons {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;

                .buttons-row {
                    display: flex;
                    flex: 1;
                    width: 100%;
                    gap:16px;

                    button {
                        flex: 1;
                    }
                }
            }

        button.mdc-icon-button {
            padding: 4px;
            width: fit-content;
            height: fit-content;
            display: flex;
            color: #949C9E;
            &[disabled] {
                color: #E5E5E5;
            }

            mat-icon {
                display: flex;
                align-items: center;
                width: fit-content;
                height: fit-content;
                font-size: 18px;
                transform: scale(2.5);
            }
        }
      }
  
      .header-label {
        line-height: 24px;
        font-weight: 500;
        text-align: center;
      }
    `,
    ],
    template: `
        <div class="header header-buttons">
            <div class="buttons-row">
                <button class="primary-50 action-button" mat-flat-button (click)="selectToday($event)">
                    Today
                </button>
                <button class="primary-50 action-button" mat-flat-button (click)="selectNextWeekDay($event, 2)">
                    Next Monday
                </button>
            </div>
            <div class="buttons-row">
                <button class="primary-50 action-button" mat-flat-button (click)="selectNextWeekDay($event, 3)">
                    Next Tuesday
                </button>
                <button class="primary-50 action-button" mat-flat-button (click)="selectAfterWeek($event)">
                    After 1 Week
                </button>
            </div>
        </div>
        <div class="header">
            <button [disabled]="!previousEnabled" mat-icon-button (click)="previousMonth()">
                <mat-icon fontSet="material-icons-rounded">arrow_left</mat-icon>
            </button>
            <span class="header-label">{{periodLabel}}</span>
            <button [disabled]="!nextEnabled" mat-icon-button (click)="nextMonth()">
                <mat-icon fontSet="material-icons-rounded">arrow_right</mat-icon>
            </button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, MatIconModule]
})
export class DatePickerHeaderComponent<D> implements OnDestroy {
    private _destroyed = new Subject<void>();
    yearsPerPage = 24;

    constructor(
        private _calendar: MatCalendar<D>,
        private _dateAdapter: DateAdapter<D>,
        @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
        cdr: ChangeDetectorRef,
    ) {
        _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    get periodLabel() {
        return this._dateAdapter
            .format(this._calendar.activeDate, 'MMMM YYYY')
            .toLocaleUpperCase();
    }

    // weekDay counting from 1: sunday
    selectNextWeekDay(event: Event, weekDay: number) {
        const todayOrSelectedDate = this._calendar.selected || this._calendar.activeDate

        if (!(todayOrSelectedDate instanceof DateRange)) {
            // getDayofWeek counts from zero so + 1
            const currentDay = this._dateAdapter.getDayOfWeek(todayOrSelectedDate) + 1
            let noOfDaysForNextWeekDay = currentDay < weekDay ? (weekDay - currentDay) : Math.abs(currentDay - (7 + weekDay))

            const dateToSelect = (todayOrSelectedDate as Moment).add(noOfDaysForNextWeekDay, 'days')
            this.selectDateAndShowInMonthView(dateToSelect as D, event)
        }
    }

    selectAfterWeek(event: Event) {
        const todayOrSelectedDate = this._calendar.selected as D || this._calendar.activeDate as D
        const dateToSelect = (todayOrSelectedDate as Moment).add(7, 'days')

        this.selectDateAndShowInMonthView(dateToSelect as D, event)
    }

    get nextEnabled(): boolean {
        return (
            !this._calendar.maxDate || !this._isSameView(this._calendar.activeDate, this._calendar.maxDate)
        );
    }

    get previousEnabled(): boolean {
        if (!this._calendar.minDate) {
            return true;
        }
        return (
            !this._calendar.minDate || !this._isSameView(this._calendar.activeDate, this._calendar.minDate)
        );
    }

    previousMonth() {
        this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
    }

    selectToday(event: Event) {
        this.selectDateAndShowInMonthView(this._dateAdapter.today(), event)
    }

    nextMonth() {
        this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
    }

    private selectDateAndShowInMonthView(date: D, event: Event) {
        this._calendar._dateSelected({ value: date } as MatCalendarUserEvent<D>);
        this._calendar._goToDateInView(date, 'month')
        this._calendar.stateChanges.next();
    }

    private _isSameView(date1: D, date2: D): boolean {
        if (this._calendar.currentView == 'month') {
            return (
                this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2) &&
                this._dateAdapter.getMonth(date1) == this._dateAdapter.getMonth(date2)
            );
        }
        if (this._calendar.currentView == 'year') {
            return this._dateAdapter.getYear(date1) == this._dateAdapter.getYear(date2);
        }
        // Otherwise we are in 'multi-year' view.
        return this.isSameMultiYearView(
            this._dateAdapter,
            date1,
            date2,
            this._calendar.minDate,
            this._calendar.maxDate,
        );
    }

    isSameMultiYearView<D>(
        dateAdapter: DateAdapter<D>,
        date1: D,
        date2: D,
        minDate: D | null,
        maxDate: D | null,
    ): boolean {
        const year1 = dateAdapter.getYear(date1);
        const year2 = dateAdapter.getYear(date2);
        const startingYear = this.getStartingYear(dateAdapter, minDate, maxDate);
        return (
            Math.floor((year1 - startingYear) / this.yearsPerPage) ===
            Math.floor((year2 - startingYear) / this.yearsPerPage)
        );
    }

    getStartingYear<D>(
        dateAdapter: DateAdapter<D>,
        minDate: D | null,
        maxDate: D | null,
    ): number {
        let startingYear = 0;
        if (maxDate) {
            const maxYear = dateAdapter.getYear(maxDate);
            startingYear = maxYear - this.yearsPerPage + 1;
        } else if (minDate) {
            startingYear = dateAdapter.getYear(minDate);
        }
        return startingYear;
    }
}