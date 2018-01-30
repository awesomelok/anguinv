import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    private setHeaders(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        return new HttpHeaders(headersConfig);
    }

    get(uri: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get('${API_URL}/${uri}', { params });
    }

    put(uri: string, body: Object = {}): Observable<any> {
        return this.http.put('${API_URL}/${uri}', body);
    }

    post(uri: string, body: Object = {}): Observable<any> {
        return this.http.post('${API_URL}/${uri}', body);
    }

    delete(uri: string): Observable<any> {
        return this.http.delete('${API_URL}/${uri}');
    }
}
