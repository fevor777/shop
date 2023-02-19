import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isAdmin()) {
        return true;
    } else {
        this.loginService.redirectUrl = state.url || '';
        this.router.navigate(['/login']);
        alert('Please login as Admin');
        return false;
    }
  }

  canLoad(route: Route, segments: UrlSegment[]
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.loginService.isAdmin()) {
        return true;
    } else {
        this.loginService.redirectUrl = segments.map(s => s.path).join('/') || '';
        this.router.navigate(['/login']);
        alert('Please login as Admin');
        return false;
    }
  }
  
}
