import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { UserRole } from '../first/user-role';
import { LoginStatus } from './login-status';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private router: Router) {}

    loginStatus: LoginStatus = { authorized: true, userRole: UserRole.ADMIN };
    // loginStatus: LoginStatus = { authorized: false, userRole: UserRole.USER };
    redirectUrl: string = '';

    login(userRole: UserRole): void {
        if (userRole) {
           this.loginStatus.authorized = true;
           this.loginStatus.userRole = userRole;
           if (this.redirectUrl) {
                this.router.navigate([this.redirectUrl]);
                this.redirectUrl = '';
           }
        }
    }

    logout(): void {
        this.loginStatus.authorized = false;
    }

    isAdmin(): boolean {
        return this.loginStatus.authorized && this.loginStatus.userRole === UserRole.ADMIN;
    }

    isUser(): boolean {
        return this.loginStatus.authorized && this.loginStatus.userRole === UserRole.USER;
    }

    isAuthorized(): boolean {
        return this.loginStatus.authorized;
    }

}