import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService, TokenService } from '../../../shared';
import { Router } from '@angular/router/';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private _authService: AuthService;

    constructor(
        private injector: Injector,
        private router: Router,
        private tokenService: TokenService
    ) { }

    private authService(): AuthService {
        if (!this._authService) {
            this._authService = this.injector.get(AuthService);
        }
        return this._authService;
    }

    newRequestWithToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getAccessToken();
        req = !!token ? this.newRequestWithToken(req, token) : req;

        return next.handle(req).catch(
            error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            return this.handle400Error(error);
                        case 401:
                            if (error.url.indexOf('login') !== -1) {
                                return this.handleDefaultError(error);
                            }
                            return this.handle401Error(req, next);
                        default:
                            return this.handleDefaultError(error);
                    }
                } else {
                    return this.handleDefaultError(error);
                }
            }
        );
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        // refresh token
        return this.authService().refreshToken()
            .switchMap(
            token => {
                if (Object.prototype.hasOwnProperty.call(token, 'access_token')) {
                    this.authService().setAuth(token);
                    return next.handle(this.newRequestWithToken(req, token['access_token']));
                }

                return this.handleCantGetNewToken();
            }
            );
    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return Observable.throw("");
        }
        return Observable.throw(error);
    }

    handleDefaultError(error) {
        return Observable.throw(error);
    }

    handleCantGetNewToken() {
        this.authService().purgeAuth();
        return Observable.throw('');
    }

    redirectToLogin(): void {
        this.router.navigate['/login'];
    }
}
