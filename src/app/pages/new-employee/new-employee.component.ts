import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePickerHeaderComponent } from 'src/app/components/date-picker-header/date-picker-header.component';
import { db, Employee, EmployeeRoles } from 'src/app/db/db';

@Component({
    selector: 'app-new-employee',
    templateUrl: './new-employee.component.html',
    styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {
    constructor(private formBuilder: FormBuilder, private router: Router) { }
    readonly employeeRolesEnum = EmployeeRoles
    datePickerHeaderComponent = DatePickerHeaderComponent
    newEmployeeForm = this.formBuilder.group({
        name: new FormControl<string>('', { validators: [Validators.required] }),
        role: new FormControl<EmployeeRoles | null>(null, { validators: [Validators.required] }),
        startDate: new FormControl<string | null>(new Date().toISOString(), { validators: [Validators.required], nonNullable: true }),
        endDate: new FormControl<string | null>(null)
    })

    openDatePicker(toggle: unknown) {
        debugger
    }

    onSaveClick() {
        this.newEmployeeForm.markAllAsTouched()
        this.newEmployeeForm.updateValueAndValidity()

        if (this.newEmployeeForm.valid) {
            const newEmployee = this.newEmployeeForm.value as unknown as Employee
            db.employees.add(newEmployee).then(() => this.router.navigate(['employees']))
        }
    }

}
