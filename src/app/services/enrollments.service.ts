import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnrollmentService {
    enrollmentUrl:string = BACKEND_URL + "/api/enrollment";

    constructor(
        private http: HttpClient,
    ) {}

    async getEnrollments() {
        return this.http.get(this.enrollmentUrl + "/all");        
    }

    async getEnrollmentsStudent(student_id:any) {
        return this.http.get(this.enrollmentUrl + "/student?student_id="+student_id);
    }

    async create(enrollment:any) {
        return this.http.post(this.enrollmentUrl + "/create", enrollment);
    }

    async update(enrollment:any) {
        return this.http.put(this.enrollmentUrl + "/update?id=" + enrollment.id, enrollment);
    }
}