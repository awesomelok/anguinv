import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService, User } from '../../shared';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    isLoggedIn: Observable<boolean>;
    userIconColor: string = '';
    userTooltipName: string;

    ngOnInit () {
        this.isLoggedIn = this.authService.isLoggedIn();

        this.authService.isLoggedIn().subscribe(
            isLoggedIn => {
                this.userIconColor = isLoggedIn ? 'primary' : '';
            }
        );

        this.authService.currentUser().subscribe(
            user => {
                this.userTooltipName = user.firstname && user.lastname ? user.firstname + ' ' + user.lastname : '';
            }
        );
    }

    logout() {
        this.authService.logout().subscribe(
            (data) => {}
        );
    }
}
