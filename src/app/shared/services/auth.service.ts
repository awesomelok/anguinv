import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { TokenService } from './token.service';
import { ApiService } from './api.service';
import { User } from '../models/user';

@Injectable()
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    private currentUserObservable = this.currentUserSubject.asObservable().distinctUntilChanged();

    private isLoggedInSubject: BehaviorSubject<boolean>;
    private isLoggedInObservable: Observable<boolean>;

    private redirectUrl: string;

    constructor(
        private apiService: ApiService,
        private tokenService: TokenService
    ) {
        this.isLoggedInSubject = new BehaviorSubject<boolean>(!!this.tokenService.getAccessToken());
        this.isLoggedInObservable = this.isLoggedInSubject.asObservable().distinctUntilChanged();
    }

    populate() {
        if (this.tokenService.getAccessToken()) {
            this.apiService.get('user').subscribe(
                data => this.setCurrentUser(data['data']),
                error => this.purgeAuth()
            );
        } else {
            this.purgeAuth();
        }
    }

    login(credentails: { email: string; password: string }): Observable<boolean> {
        return this.apiService.post('login', credentails).map(
            data => {
                this.setAuth(data);
                return data;
            }
        );
    }

    register(data): Observable<any> {
        return this.apiService.post('register', data);
    }

    setCurrentUser(user: User): void {
        this.currentUserSubject.next(user);
    }

    setAuth(data: { access_token: string; refresh_token: string }): void {
        this.tokenService.saveAccessToken(data.access_token);
        this.tokenService.saveRefreshToken(data.refresh_token);
        this.isLoggedInSubject.next(true);
    }

    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }

    getRedirectUrl(): string {
        return this.redirectUrl;
    }

    purgeAuth(): void {
        this.currentUserSubject.next(new User);
        this.tokenService.destroyAccessToken();
        this.tokenService.destroyRefreshToken();
        this.isLoggedInSubject.next(false);
    }

    logout(): Observable<boolean> {
        return this.apiService.get('logout').map(
            data => {
                this.purgeAuth();
                return data;
            }
        );
    }

    isLoggedIn(): Observable<boolean> {
        return this.isLoggedInObservable;
    }

    currentUser(): Observable<User> {
        return this.currentUserObservable;
    }

    refreshToken(): Observable<any> {
        const refreshToken = this.tokenService.getRefreshToken();
        if (!refreshToken) {

        }
        return this.apiService.post('token/refresh', { refresh_token: refreshToken });
    }
}
