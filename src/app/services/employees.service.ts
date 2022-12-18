import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    employeeUrl:string = BACKEND_URL + "/api/employee";

    constructor(
        private http: HttpClient,
    ) {}

    async getEmployees() {
        return this.http.get(this.employeeUrl + "/all");        
    }

    async create(employee:any) {
        return this.http.post(this.employeeUrl + "/create", employee);
    }

    async update(employee:any) {
        return this.http.put(this.employeeUrl + "/update?id=" + employee.id, employee);
    }
}