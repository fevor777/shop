import { createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { adapter, initialProductsState } from './products.state';

export const productsReducer = createReducer(
  initialProductsState,

  on(ProductsActions.getProducts, (state) => {
    console.log('GET_PRODUCTS action being handled!');
    return {
      ...state,
      loading: true,
    };
  }),

  on(ProductsActions.getProductsSuccess, (state, { products }) => {
    console.log('GET_PRODUCTS_SUCCESS action being handled!');
    return adapter.setAll(products, { ...state, loading: false, loaded: true });
  }),

  on(ProductsActions.getProductsError, (state, { error }) => {
    console.log('GET_PRODUCTS_ERROR action being handled!');
    return {
      ...state,
      loading: false,
      loaded: false,
      error,
    };
  }),

  on(ProductsActions.createProductSuccess, (state, { product }) => {
    console.log('CREATE_PRODUCT_SUCCESS action being handled!');
    return adapter.addOne(product, state);
  }),

  on(ProductsActions.updateProductSuccess, (state, { product }) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    return adapter.updateOne({ id: product.id!, changes: product }, state);
  }),
  on(
    ProductsActions.createProductError,
    ProductsActions.updateProductError,
    ProductsActions.deleteProductError,
    (state, { error }) => {
      console.log('CREATE/UPDATE/DELETE_PRODUCT_ERROR action being handled!');
      return {
        ...state,
        error,
      };
    }
  ),

  on(ProductsActions.deleteProductSuccess, (state, { id }) => {
    console.log('DELETE_PRODUCT_SUCCESS action being handled!');
    return adapter.removeOne(id, state);
  })
);
