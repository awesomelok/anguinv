import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const ACCESS_TOKEN_NAME: string = 'ACCESS_TOKEN';
const REFRESH_TOKEN_NAME: string = 'REFRESH_TOKEN';

@Injectable()
export class TokenService {

    constructor() { }

    getAccessToken(): string {
        return window.localStorage.getItem(ACCESS_TOKEN_NAME);
    }

    saveAccessToken(accessToken: string): void {
        return window.localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
    }

    destroyAccessToken(): void {
        return window.localStorage.removeItem(ACCESS_TOKEN_NAME);
    }

    getRefreshToken(): string {
        return window.localStorage.getItem(REFRESH_TOKEN_NAME);
    }

    saveRefreshToken(refreshToken: string): void {
        return window.localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
    }

    destroyRefreshToken(): void {
        return window.localStorage.removeItem(REFRESH_TOKEN_NAME);
    }
}
