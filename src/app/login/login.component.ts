import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserRole } from '../first/user-role';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(public loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }

  logAsUser(): void {
    this.loginService.login(UserRole.USER);
  }

  logAsAdmin(): void {
    this.loginService.login(UserRole.ADMIN);
  }

}
