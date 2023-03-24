import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../shared/model/product.model';

import { CartProductModel } from '../../../shared/model/cart-product.model';
import * as CartProductsActions from './cart-products.actions';
import {
  selectCartProductsData,
  selectCartProductsExisting,
  selectCartProductsLoaded,
  selectCartProductsTotalCost,
  selectCartProductsTotalQuantity,
} from './cart-products.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartProductsFacade {
  cartProducts$: Observable<ReadonlyArray<CartProductModel>>;
  cartProductsExisting$: Observable<boolean>;
  cartProductsTotalCost$: Observable<number>;
  cartProductsTotalQuantity$: Observable<number>;
  cartProductsLoaded$: Observable<boolean>;

  constructor(private store: Store) {
    this.cartProducts$ = this.store.select(selectCartProductsData);
    this.cartProductsExisting$ = this.store.select(selectCartProductsExisting);
    this.cartProductsTotalCost$ = this.store.select(
      selectCartProductsTotalCost
    );
    this.cartProductsTotalQuantity$ = this.store.select(
      selectCartProductsTotalQuantity
    );
    this.cartProductsLoaded$ = this.store.select(selectCartProductsLoaded);
  }

  getCartProducts() {
    this.store.dispatch(CartProductsActions.getCartProducts());
  }

  deleteCartProduct(props: { id: number }) {
    this.store.dispatch(CartProductsActions.deleteCartProduct(props));
  }

  deleteAllCartProduct() {
    this.store.dispatch(CartProductsActions.deleteAllCartProducts());
  }

  increaseCartProductQuantity(props: { cartProduct: CartProductModel }) {
    this.store.dispatch(CartProductsActions.increaseCartProductQuantity(props));
  }

  decreaseCartProductQuantity(props: { cartProduct: CartProductModel }) {
    this.store.dispatch(CartProductsActions.decreaseCartProductQuantity(props));
  }

  addProductToCart(props: { product: ProductModel }) {
    this.store.dispatch(CartProductsActions.addProductToCart(props));
  }
}
