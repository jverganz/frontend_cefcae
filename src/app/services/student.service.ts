import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    studentUrl:string = BACKEND_URL + "/api/student";

    constructor(
        private http: HttpClient,
    ) {}

    async getStudents() {
        return this.http.get(this.studentUrl + "/all");        
    }

    async create(student:any) {
        return this.http.post(this.studentUrl + "/create", student);
    }

    async update(student:any) {
        return this.http.put(this.studentUrl + "/update?id=" + student.id, student);
    }
}