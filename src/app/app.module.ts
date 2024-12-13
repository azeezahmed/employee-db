import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CustomMomentDateAdapter } from './lib/cusomtMomentDateAdapter';
import { ReactiveFormsModule } from '@angular/forms';

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
        NewEmployeeComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [{
        provide: DateAdapter,
        useClass: CustomMomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
    bootstrap: [AppComponent]
})
export class AppModule { }
