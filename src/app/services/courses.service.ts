import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    coursesUrl:string = BACKEND_URL + "/api/courses";

    constructor(
        private http: HttpClient,
    ) {}

    async getCoursesStudent(studentId:number) {
        return this.http.get(this.coursesUrl + "?student_id=" + studentId);        
    }

    async getCourses() {
        return this.http.get(this.coursesUrl);        
    }

    async create(course:any) {
        return this.http.post(this.coursesUrl + "/create", course);
    }

    async update(course:any) {
        return this.http.put(this.coursesUrl + "/update?id=" + course.id, course);
    }
}