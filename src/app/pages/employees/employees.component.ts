import { Component, OnInit } from '@angular/core';
import { db, Employee, EmployeeRoles } from 'src/app/db/db';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    currentEmployees: Employee[] = []
    previousEmployees: Employee[] = []
    readonly employeeRolesEnum = EmployeeRoles

    constructor() { }

    ngOnInit(): void {
        db.employees
            .toArray((employees) =>
                employees.forEach(employee =>
                    employee.endDate ? this.previousEmployees.push(employee) : this.currentEmployees.push(employee)));
    }
}
