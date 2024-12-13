import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { db, Employee } from 'src/app/db/db';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[] = []

    constructor() { }

    ngOnInit(): void {
        db.employees.toArray((employees) => this.employees = employees);
    }

}
