import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take, tap } from 'rxjs';

import { ProductModel } from '../../shared/model/product.model';
import { selectSelectedProductByUrl } from '../@ngrx';
import * as RouterActions from '../@ngrx/router/router.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductExistsGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectSelectedProductByUrl).pipe(
      tap((product) => {
        if (!product?.id) {
          this.store.dispatch(RouterActions.go({ path: ['/not-found-page'] }));
        }
      }),
      map((product: ProductModel) => !!product?.id),
      take(1)
    );
  }
}
