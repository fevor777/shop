import { UserRole } from '../first/user-role';

export class LoginStatus {
    authorized: boolean = false;
    userRole: UserRole = UserRole.USER;
}