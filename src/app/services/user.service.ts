import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userUrl:string = BACKEND_URL + "/api/auth";
    isLoggedIn = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
    ) {}

    async login(username:string, password:string) {
        return this.http.post(this.userUrl, { username, password });        
    }

    changeLogged(value:boolean) {
        this.isLoggedIn.next(value);
    }
}