import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { type Action } from '@ngrx/store';
import { type Observable, switchMap, map, concatMap } from 'rxjs';
import { ProductModel } from 'src/app/shared/model/product.model';
import { ProductsPromiseService } from './../../../product/service/products-promise.service';
import * as ProductsActions from './products.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';


@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productPromiseService: ProductsPromiseService
  ) {
    console.log('[PRODUCTS EFFECTS]');
  }

  getProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.getProducts),
      switchMap(() =>
        this.productPromiseService
          .getList()
          .then((products) => ProductsActions.getProductsSuccess({ products }))
          .catch((error) => ProductsActions.getProductsError({ error }))
      )
    )
  );

  updateProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.updateProduct),
      map((action) => action.product),
      concatMap((product: ProductModel) =>
        this.productPromiseService
          .update(product)
          .then((updatedProduct: ProductModel) => {
            return ProductsActions.updateProductSuccess({ product: updatedProduct });
          })
          .catch((error) => ProductsActions.updateProductError({ error }))
      )
    )
  );

  createProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      map((action) => action.product),
      concatMap((product: ProductModel) =>
        this.productPromiseService
          .create(product)
          .then((createdProduct: ProductModel) => {
            return ProductsActions.createProductSuccess({ product: createdProduct });
          })
          .catch((error) => ProductsActions.createProductError({ error }))
      )
    )
  );

  deleteProduct$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      map((action) => action.id),
      concatMap((id: number) =>
        this.productPromiseService
          .delete(id)
          .then(() => ProductsActions.deleteProductSuccess({ id }))
          .catch((error) => ProductsActions.deleteProductError({ error }))
      )
    )
  );

  createUpdateProductSuccess$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductsActions.createProductSuccess, ProductsActions.updateProductSuccess),
      map(() => RouterActions.go({ path: ['/admin']}))
    );
  });
}
