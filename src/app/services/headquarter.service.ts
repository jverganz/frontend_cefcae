import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeadquarterService {
    headquarterUrl:string = BACKEND_URL + "/api/headquarter";

    constructor(
        private http: HttpClient,
    ) {}

    async getHeadquarters() {
        return this.http.get(this.headquarterUrl);        
    }

    async createHeadquarter(headquarter:any) {
        return await this.http.post(this.headquarterUrl + "/create", headquarter);
    }

    async updateHeadquarter(headquarter:any) {
        return this.http.put(this.headquarterUrl + "/update?id=" + headquarter.id, headquarter);
    }
}