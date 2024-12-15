import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';

const routes: Routes = [
    {
        path: 'employees',
        data: { header: 'Employee List' },
        title: 'Employee database',
        component: EmployeesComponent
    },
    {
        path: 'new-employee',
        data: { header: 'Add Employee Details' },
        title: 'Employee database - add ',
        component: NewEmployeeComponent
    },
    {
        path: '**',
        redirectTo: 'employees'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
