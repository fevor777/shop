import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { selectCartProductsExisting } from '../@ngrx';

@Injectable({
  providedIn: 'root',
})
export class IsCartEmptyGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectCartProductsExisting).pipe(
      tap((value) => {
        if (!value) {
          alert('Your cart is empty!');
        }
      })
    );
  }
}
