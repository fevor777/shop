import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserRole } from '../first/user-role';
import * as RouterActions from './../core/@ngrx/router/router.actions';
import { LoginStatus } from './login-status';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private store: Store) {}

    loginStatus: LoginStatus = { authorized: false, userRole: UserRole.USER };
    redirectUrl: string = '';

    login(userRole: UserRole): void {
        if (userRole) {
           this.loginStatus.authorized = true;
           this.loginStatus.userRole = userRole;
           if (this.redirectUrl) {
                this.store.dispatch(RouterActions.go({ path: [this.redirectUrl] }));
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