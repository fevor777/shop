import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { CartProductModel } from '../../../shared/model/cart-product.model';
import { CartObservableService } from '../../../shared/service/cart-observable.service';
import * as CartProductsActions from './cart-products.actions';
import { selectCartProductsData } from './cart-products.selectors';

@Injectable()
export class CartProductsEffects {
  constructor(
    private actions$: Actions,
    private cartObservableService: CartObservableService,
    private store: Store
  ) {
    console.log('[CART PRODUCTS EFFECTS]');
  }

  getCartProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.getCartProducts),
      switchMap(() =>
        this.cartObservableService.getList().pipe(
          map((cartProducts) =>
            CartProductsActions.getCartProductsSuccess({ cartProducts })
          ),
          catchError((error) =>
            of(CartProductsActions.getCartProductsError({ error }))
          )
        )
      )
    )
  );

  updateCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.updateCartProduct),
      map((action) => action.cartProduct),
      concatMap((cartPr: CartProductModel) =>
        this.cartObservableService.update(cartPr).pipe(
          map((cartProduct) =>
            CartProductsActions.updateCartProductSuccess({ cartProduct })
          ),
          catchError((error) =>
            of(CartProductsActions.updateCartProductError({ error }))
          )
        )
      )
    )
  );

  createCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.createCartProduct),
      map((action) => action.cartProduct),
      concatMap((cartProduct: CartProductModel) =>
        this.cartObservableService.create(cartProduct).pipe(
          map((cartProduct) =>
            CartProductsActions.createCartProductSuccess({ cartProduct })
          ),
          catchError((error) =>
            of(CartProductsActions.createCartProductError({ error }))
          )
        )
      )
    )
  );

  deleteCartProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.deleteCartProduct),
      map((action) => action.id),
      concatMap((id: number) =>
        this.cartObservableService.delete(id).pipe(
          map((id: number) =>
            CartProductsActions.deleteCartProductSuccess({ id })
          ),
          catchError((error) =>
            of(CartProductsActions.deleteCartProductError({ error }))
          )
        )
      )
    )
  );

  deleteAllCartProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.deleteAllCartProducts),
      withLatestFrom(this.store.select(selectCartProductsData)),
      switchMap(([_, cartProducts]) => {
        const obs: Observable<number>[] = cartProducts.map((pr: CartProductModel) =>
          this.cartObservableService.delete(pr.id)
        );
        return forkJoin(obs).pipe(
          map(() =>
            CartProductsActions.deleteAllCartProductsSuccess()
          ),
          catchError((error) =>
            of(CartProductsActions.deleteCartProductError({ error }))
          )
        );
      }),
    )
  );

  addProductToCart$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.addProductToCart),
      map((action) => action.product),
      withLatestFrom(this.store.select(selectCartProductsData)),
      switchMap(([product, cartProducts]) => {
        const cartProduct = cartProducts.find((c) => c.id === product.id);
        if (cartProduct) {
          const updatedCartProduct: CartProductModel = {
            ...cartProduct,
            count: cartProduct.count + 1,
          };
          return of(
            CartProductsActions.updateCartProduct({
              cartProduct: updatedCartProduct,
            })
          );
        } else {
          const newCartProduct: CartProductModel = { ...product, count: 1 };
          return of(
            CartProductsActions.createCartProduct({
              cartProduct: newCartProduct,
            })
          );
        }
      })
    )
  );

  increaseCartProductQuantity$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.increaseCartProductQuantity),
      map((action) => action.cartProduct),
      map((cartPr: CartProductModel) => {
        const updatedCartProduct: CartProductModel = {
          ...cartPr,
          count: cartPr.count + 1,
        };
        return CartProductsActions.updateCartProduct({
          cartProduct: updatedCartProduct,
        });
      })
    )
  );

  decreaseCartProductQuantity$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CartProductsActions.decreaseCartProductQuantity),
      map((action) => action.cartProduct),
      map((cartPr: CartProductModel) => {
        if (cartPr.count === 1) {
          return CartProductsActions.deleteCartProduct({ id: cartPr.id });
        } else {
          const updatedCartProduct: CartProductModel = {
            ...cartPr,
            count: cartPr.count - 1,
          };
          return CartProductsActions.updateCartProduct({
            cartProduct: updatedCartProduct,
          });
        }
      })
    )
  );
}
