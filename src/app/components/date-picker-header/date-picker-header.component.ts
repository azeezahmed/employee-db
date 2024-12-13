import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from "@angular/material/core";
import { MatCalendar, MatCalendarUserEvent } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'date-picker-header',
    styles: [
        `
      .header {
        display: flex;
        align-items: center;
        margin: 16px 16px 0px 16px;
        justify-content: center;
        gap: 3px;


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

        button.mat-icon-button {
            padding: 4px;
            width: fit-content;
            height: fit-content;
            display: flex;
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
                <button class="primary-50 action-button" mat-flat-button (click)="selectToday()">
                    Today
                </button>
                <button class="primary-50 action-button" mat-flat-button (click)="selectToday()">
                    Next Monday
                </button>
            </div>
            <div class="buttons-row">
                <button class="primary-50 action-button" mat-flat-button (click)="selectToday()">
                    Next Tuesday
                </button>
                <button class="primary-50 action-button" mat-flat-button (click)="selectToday()">
                    Next Week
                </button>
            </div>
        </div>
        <div class="header">
            <button mat-icon-button (click)="previousClicked('month')">
                <mat-icon>arrow_left</mat-icon>
            </button>
            <span class="header-label">{{periodLabel}}</span>
            <button mat-icon-button (click)="nextClicked('month')">
                <mat-icon>arrow_right</mat-icon>
            </button>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, MatIconModule]
})
export class DatePickerHeaderComponent<D> implements OnDestroy {
    private _destroyed = new Subject<void>();

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
            .format(this._calendar.activeDate, this._dateFormats.display.monthYearA11yLabel)
            .toLocaleUpperCase();
    }

    previousClicked(mode: 'month' | 'year') {
        this._calendar.activeDate =
            mode === 'month'
                ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
                : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
    }

    selectToday() {
        this._calendar._dateSelected({ value: new Date() } as MatCalendarUserEvent<D>)
        this._calendar.stateChanges.next();
        // this._calendar.activeDate = new Date() as D
    }

    nextClicked(mode: 'month' | 'year') {
        this._calendar.activeDate =
            mode === 'month'
                ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
                : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
    }
}