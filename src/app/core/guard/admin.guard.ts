import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LoginService } from '../../login/login.service';
import * as RouterActions from './../../core/@ngrx/router/router.actions';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private loginService: LoginService, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isAdmin()) {
        return true;
    } else {
        this.loginService.redirectUrl = state.url || '';
        this.store.dispatch(RouterActions.go({ path: ['/login'] }));
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
        this.store.dispatch(RouterActions.go({ path: ['/login'] }));
        alert('Please login as Admin');
        return false;
    }
  }
  
}
