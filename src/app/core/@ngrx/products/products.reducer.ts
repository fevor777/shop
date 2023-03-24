import { createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { initialProductsState } from './products.state';

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
    const data = [...products];
    return {
      ...state,
      data,
      loading: false,
      loaded: true,
    };
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
    const data = [...state.data, { ...product }];
    return {
      ...state,
      data,
      changed: true,
    };
  }),

  on(ProductsActions.updateProductSuccess, (state, { product }) => {
    console.log('UPDATE_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data];
    const index = data.findIndex((t) => t.id === product.id);
    data[index] = { ...product };
    return {
      ...state,
      data,
      changed: true,
    };
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
    const data = state.data.filter((t) => t.id !== id);
    return {
      ...state,
      data,
    };
  })
);
