import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    constructor(
        private apiService: ApiService
    ) { }

    verify(token: string): Observable<any> {
        return this.apiService.get('user/verify' + token);
    }
}
