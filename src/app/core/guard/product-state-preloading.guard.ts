import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, take, tap } from 'rxjs';

import { selectProductsLoaded } from '../@ngrx';
import * as ProductsActions from '../@ngrx/products/products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsStatePreloadingGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectProductsLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(ProductsActions.getProducts());
        }
      }),
      filter((loaded: boolean) => loaded),
      take(1),
      catchError(() => of(false))
    );
  }
}
