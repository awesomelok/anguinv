import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService, AuthGuard } from '../shared';

import {
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,

        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    declarations: [LoginComponent, RegisterComponent],
    providers: [
        AuthService,
        AuthGuard,
    ]

})
export class AuthModule { }
