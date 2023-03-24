import { createReducer, on } from '@ngrx/store';

import * as CartProductsActions from './cart-products.actions';
import { initialCartProductsState } from './cart-products.state';

export const cartProductsReducer = createReducer(
  initialCartProductsState,

  on(CartProductsActions.getCartProducts, (state) => {
    console.log('GET_CART_PRODUCTS action being handled!');
    return {
      ...state,
      loading: true,
    };
  }),

  on(CartProductsActions.getCartProductsSuccess, (state, { cartProducts }) => {
    console.log('GET_CART_PRODUCTS_SUCCESS action being handled!');
    const data = [...cartProducts];
    return {
      ...state,
      data,
      loading: false,
      loaded: true,
    };
  }),

  on(CartProductsActions.getCartProductsError, (state, { error }) => {
    console.log('GET_CART_PRODUCTS_ERROR action being handled!');
    return {
      ...state,
      loading: false,
      loaded: false,
      error,
    };
  }),

  on(CartProductsActions.createCartProductSuccess, (state, { cartProduct }) => {
    console.log('CREATE_CART_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data, { ...cartProduct }];
    return {
      ...state,
      data,
      changed: true,
    };
  }),

  on(CartProductsActions.updateCartProductSuccess, (state, { cartProduct }) => {
    console.log('UPDATE_CART_PRODUCT_SUCCESS action being handled!');
    const data = [...state.data];
    const index = data.findIndex((t) => t.id === cartProduct.id);
    data[index] = { ...cartProduct };
    return {
      ...state,
      data,
      changed: true,
    };
  }),
  on(
    CartProductsActions.createCartProductError,
    CartProductsActions.updateCartProductError,
    CartProductsActions.deleteCartProductError,
    (state, { error }) => {
      console.log(
        'CREATE/UPDATE/DELETE_CART_PRODUCT_ERROR action being handled!'
      );
      return {
        ...state,
        error,
      };
    }
  ),

  on(CartProductsActions.deleteCartProductSuccess, (state, { id }) => {
    console.log('DELETE_CART_PRODUCT_SUCCESS action being handled!');
    const data = state.data.filter((t) => t.id !== id);
    return {
      ...state,
      data,
    };
  }),

  on(CartProductsActions.deleteAllCartProductsSuccess, (state) => {
    console.log('DELETE_ALL_CART_PRODUCTS_SUCCESS action being handled!');
    return {
      ...state,
      data: []
    };
  }),
);
