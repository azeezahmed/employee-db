import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { db, Employee, EmployeeRoles } from 'src/app/db/db';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':leave', [
                animate('350ms ease-out', style({ transform: 'translateX(-150%)' })),
                animate('100ms ease-out', style({ height: '0px' }))
            ])
        ])
    ]
})
export class EmployeesComponent implements OnInit {
    currentEmployees: Employee[] = []
    previousEmployees: Employee[] = []
    enableSwiping: boolean = false;
    readonly employeeRolesEnum = EmployeeRoles

    constructor(private snackBar: MatSnackBar, private breakPointObserver: BreakpointObserver) { }

    ngOnInit(): void {
        db.employees
            .toArray((employees) =>
                employees.forEach(employee =>
                    employee.endDate ? this.previousEmployees.push(employee) : this.currentEmployees.push(employee)));
        this.breakPointObserver
            .observe([Breakpoints.Web])
            .subscribe((result) => this.enableSwiping = !result.matches)
    }

    OnEmployeeDelete(employee: Employee, type: 'current' | 'previous') {
        if (employee.id) {
            let employeeIdMarkedForDelete: number | null = employee.id
            if (type == 'current')
                this.currentEmployees = this.currentEmployees.filter((employee) => employee.id !== employeeIdMarkedForDelete)
            else
                this.previousEmployees = this.previousEmployees.filter((employee) => employee.id !== employeeIdMarkedForDelete)
            const snackBarRef = this.snackBar.open('Employee has been Deleted', 'Undo')
            snackBarRef.onAction().subscribe(() => employeeIdMarkedForDelete = null)
            snackBarRef.afterDismissed().subscribe(() => {
                if (employeeIdMarkedForDelete)
                    db.employees.delete(employeeIdMarkedForDelete)
            })
        }
    }

    trackByEmployeeId(index: number, employee: Employee) {
        return employee.id
    }
}
