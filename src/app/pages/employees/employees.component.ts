import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { db, Employee, EmployeeRoles } from 'src/app/db/db';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    animations: [
        trigger('slideInOut', [
            // transition(':enter', [
            //     style({ transform: 'translateY(-100%)' }),
            //     animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
            // ]),
            transition(':leave', [
                animate('750ms ease-in', style({ transform: 'translateX(-150%)' })),
                animate('300ms ease-in', style({ height: '0px' }))
            ])
        ])
    ]
})
export class EmployeesComponent implements OnInit {
    currentEmployees: Employee[] = []
    previousEmployees: Employee[] = []
    readonly employeeRolesEnum = EmployeeRoles

    constructor(private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        db.employees
            .toArray((employees) =>
                employees.forEach(employee =>
                    employee.endDate ? this.previousEmployees.push(employee) : this.currentEmployees.push(employee)));
    }

    OnEmployeeDelete(employee: Employee) {
        if (employee.id) {
            let employeeIdMarkedForDelete: number | null = employee.id
            this.currentEmployees = this.currentEmployees.filter((employee) => employee.id !== employeeIdMarkedForDelete)
            const snackBarRef = this.snackBar.open('Employee has been Deleted', 'Undo', { duration: 3000 })
            snackBarRef.onAction().subscribe(() => employeeIdMarkedForDelete = null)
            snackBarRef.afterDismissed().subscribe(() => {
                // if (employeeIdMarkedForDelete) {
                //     db.employees.delete(employeeIdMarkedForDelete)
                // }
            })
        }
    }

    trackByEmployeeId(index: number, employee: Employee) {
        return employee.id
    }
}
