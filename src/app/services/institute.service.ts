import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InstituteService {
    instituteUrl:string = BACKEND_URL + "/api/institute";

    constructor(
        private http: HttpClient,
    ) {}

    async getInstitute() {
        return this.http.get(this.instituteUrl + "/all");        
    }
}