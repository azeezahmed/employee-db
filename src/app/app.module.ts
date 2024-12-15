import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CustomMomentDateAdapter } from './lib/cusomtMomentDateAdapter';
import { ReactiveFormsModule } from '@angular/forms';
import { HammerModule } from '@angular/platform-browser';
import { SwipeToDeleteDirective } from './directives/swipeToDelete.directive'

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD MMM YYYY',
    },
    display: {
        dateInput: 'DD MMM YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [
        AppComponent,
        EmployeesComponent,
        NewEmployeeComponent,
        SwipeToDeleteDirective
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HammerModule
    ],
    providers: [{
        provide: DateAdapter,
        useClass: CustomMomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000, panelClass: 'sticky-snack' } }],

    bootstrap: [AppComponent]
})
export class AppModule { }
