import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TypeDocumentService {
    typeDocumentUrl:string = BACKEND_URL + "/api/type_document";

    constructor(
        private http: HttpClient,
    ) {}

    async getTypeDocuments() {
        return this.http.get(this.typeDocumentUrl);        
    }
}