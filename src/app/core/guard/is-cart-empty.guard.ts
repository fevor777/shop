import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { CartProductsFacade } from '../@ngrx';

@Injectable({
  providedIn: 'root',
})
export class IsCartEmptyGuard implements CanActivate {
  constructor(private cartProductsFacade: CartProductsFacade) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.cartProductsFacade.cartProductsExisting$.pipe(
      tap((value) => {
        if (!value) {
          alert('Your cart is empty!');
        }
      })
    );
  }
}
