import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePickerHeaderComponent } from 'src/app/components/date-picker-header/date-picker-header.component';
import { EmployeeRoles } from 'src/app/db/db';

@Component({
    selector: 'app-new-employee',
    templateUrl: './new-employee.component.html',
    styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent {
    constructor(private formBuilder: FormBuilder) { }
    readonly employeeRolesEnum = Object(EmployeeRoles)
    employeeRoleKeys = Object.keys(this.employeeRolesEnum)
    datePickerHeaderComponent = DatePickerHeaderComponent
    newEmployeeForm = this.formBuilder.group({
        name: ['', Validators.required],
        role: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['']
    })


    openDatePicker(toggle: unknown) {
        debugger
    }

}
