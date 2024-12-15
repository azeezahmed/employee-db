import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatePickerHeaderComponent } from 'src/app/components/date-picker-header/date-picker-header.component';
import { db, Employee, EmployeeRoles } from 'src/app/db/db';

@Component({
    selector: 'app-new-employee',
    templateUrl: './new-employee.component.html',
    styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {
    constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }
    readonly employeeRolesEnum = EmployeeRoles
    datePickerHeaderComponent = DatePickerHeaderComponent
    newEmployeeForm = this.formBuilder.group({
        name: new FormControl<string>('', { validators: [Validators.required] }),
        role: new FormControl<keyof typeof EmployeeRoles | null>(null, { validators: [Validators.required] }),
        startDate: new FormControl<string | null>(new Date().toISOString(), { validators: [Validators.required] }),
        endDate: new FormControl<string | null>(null)
    })

    get startDateFormControl() {
        return this.newEmployeeForm.get('startDate')
    }

    get endDateFormControl() {
        return this.newEmployeeForm.get('endDate')
    }

    openDatePicker(toggle: unknown) {
        debugger
    }

    onSaveClick() {
        this.newEmployeeForm.markAllAsTouched()
        this.newEmployeeForm.updateValueAndValidity()

        if (this.newEmployeeForm.valid) {
            const newEmployee = this.newEmployeeForm.value as Employee;

            db.employees.add(newEmployee).then(() => {
                this.router.navigate(['employees'])
                this.snackBar.open('Employee has been added', '')
            })
        }
    }

    onCancelClick() {
        this.router.navigate(['employees'])
    }

    onDateChange(event: MatDatepickerInputEvent<any>, formControlName: string) {
        const control = this.newEmployeeForm.get(formControlName)
        control?.setValue(event.target.value.toISOString())
    }

}
