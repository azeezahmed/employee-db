import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './pages/employees/employees.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';

const routes: Routes = [
    {
        path: 'employees',
        data: { header: 'Employee List' },
        title: 'employee-database',
        component: EmployeesComponent
    },
    {
        path: 'new-employee',
        data: { header: 'Add Employee Details' },
        title: 'employee-database',
        component: NewEmployeeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
