import { APP_INITIALIZER, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../shared/service/cart.service';

export function initializeCartFactory(
  cartService: CartService
): () => Observable<any> {
  return () => cartService.getCartProducts();
}

export const carInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeCartFactory,
  deps: [CartService],
  multi: true,
};
