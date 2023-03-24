import { APP_INITIALIZER, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, filter, Observable, of, take, tap } from 'rxjs';

import { selectCartProductsLoaded } from '../@ngrx';
import * as CartProductsActions from '../@ngrx/cart/cart-products.actions';

export function initializeCartFactory(store: Store): () => Observable<any> {
  return () => {
    return store.select(selectCartProductsLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          store.dispatch(CartProductsActions.getCartProducts());
        }
      }),
      filter((loaded: boolean) => loaded),
      take(1),
      catchError(() => of(false))
    );
  };
}

export const carInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeCartFactory,
  deps: [Store],
  multi: true,
};
