import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.authService.setRedirectUrl(state.url);

        return this.authService.isLoggedIn().do(
            isLoggedIn => {
                if (!isLoggedIn) {
                    this.router.navigate(['/login']);
                }
                return isLoggedIn;
            }
        ).take(1);
    }
}
