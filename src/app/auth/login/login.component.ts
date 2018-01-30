import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    authForm: FormGroup;

    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.createForm();
    }

    ngOnInit() {

    }

    createForm(): void {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.authForm.setValue({
            email: 'test@test.com',
            password: 'sectret',
        });
    }

    ngOnDestroy() {

    }

    onSubmit(): void {
        const credentials = this.authForm.value;

        this.authService.login(credentials).subscribe(
            data => {
                this.authService.populate();

                const redirectUrl = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : '/';

                this.router.navigate([redirectUrl]);
            }
        );
    }

    goToRegister() {
        this.router.navigate(['register']);
    }
}
