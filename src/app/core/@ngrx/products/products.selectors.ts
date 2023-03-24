import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductModel } from '../../../shared/model/product.model';
import { productsFeatureKey } from '../app.state';
import { selectRouterState } from '../router';
import { ProductsState } from './products.state';

export const selectProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);

export const selectProductsData = createSelector(
  selectProductsState,
  (state: ProductsState) => state.data
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectSelectedProductByUrl = createSelector(
  selectProductsData,
  selectRouterState,
  (products, router): ProductModel => {
    const productID = router.state.params['id'];
    if (productID && Array.isArray(products)) {
      return products.find((product) => product.id === +productID);
    } else {
      return {} as ProductModel;
    }
  }
);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);
