import { APP_INITIALIZER, Provider } from '@angular/core';
import { catchError, filter, Observable, of, take, tap } from 'rxjs';

import { CartProductsFacade } from '../@ngrx';

export function initializeCartFactory(cartProductsFacade: CartProductsFacade): () => Observable<any> {
  return () => {
    return cartProductsFacade.cartProductsLoaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          cartProductsFacade.getCartProducts();
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
  deps: [CartProductsFacade],
  multi: true,
};
