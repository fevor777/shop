import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductModel } from '../../../shared/model/product.model';
import { productsFeatureKey } from '../app.state';
import { selectRouterState } from '../router';
import { adapter, ProductsState } from './products.state';

export const selectProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);

  export const {
    selectEntities: selectProductsEntities,
    selectAll: selectProductsData
   } = adapter.getSelectors(selectProductsState);

export const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

export const selectSelectedProductByUrl = createSelector(
  selectProductsEntities,
  selectRouterState,
  (products, router): ProductModel => {
    const productID = router.state.params['id'];
    if (productID) {
      return products[productID] as ProductModel;
    } else {
      return {} as ProductModel;
    }
  }
);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);
