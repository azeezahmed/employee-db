import Dexie, { Table } from 'dexie';

export enum EmployeeRoles {
    PRODUCT_DESIGNER = "Product Designer",
    FLUTTER_DEVELOPER = "Flutter Developer",
    QA_TESTER = "QA Tester",
    PRODUCT_OWNER = "Product Owner",
}

export interface Employee {
    id?: number
    role: keyof typeof EmployeeRoles
    name: string,
    startDate: string,
    endDate?: string
}

export class AppDB extends Dexie {
    employees!: Table<Employee, number>;

    constructor() {
        super('ngdexieliveQuery');
        this.version(3).stores({
            employees: '++id',
        });
        this.on('populate', () => this.populate());
    }

    async populate() {
        await db.employees.add({
            name: 'Raj Sharma',
            role: Object.keys(EmployeeRoles)[0] as keyof typeof EmployeeRoles,
            startDate: new Date().toISOString(),
        });
    }
}

export const db = new AppDB();