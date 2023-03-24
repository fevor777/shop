import { createAction, props } from '@ngrx/store';

import { CartProductModel } from '../../../shared/model/cart-product.model';
import { ProductModel } from '../../../shared/model/product.model';

export const getCartProducts = createAction(
  '[Cart Page (App)] GET_CART_PRODUCTS'
);

export const getCartProductsSuccess = createAction(
  '[Get Cart Products Effect] GET_CART_PRODUCTS_SUCCESS',
  props<{ cartProducts: CartProductModel[] }>()
);

export const getCartProductsError = createAction(
  '[Get Cart Products Effect] GET_CART_PRODUCTS_ERROR',
  props<{ error: Error | string | null }>()
);

export const createCartProduct = createAction(
  '[Cart Product Product Page] CREATE_CART_PRODUCT',
  props<{ cartProduct: CartProductModel }>()
);

export const createCartProductSuccess = createAction(
  '[Create Cart Product Effect] CREATE_CART_PRODUCT_SUCCESS',
  props<{ cartProduct: CartProductModel }>()
);

export const createCartProductError = createAction(
  '[Create Cart Product Effect] CREATE_CART_PRODUCT_ERROR',
  props<{ error: Error | string | null }>()
);

export const updateCartProduct = createAction(
  '[Update Cart Product Cart Page] UPDATE_CART_PRODUCT',
  props<{ cartProduct: CartProductModel }>()
);

export const updateCartProductSuccess = createAction(
  '[Update Cart Product Effect] UPDATE_CART_PRODUCT_SUCCESS',
  props<{ cartProduct: CartProductModel }>()
);

export const updateCartProductError = createAction(
  '[Update Cart Product Effect] UPDATE_CART_PRODUCT_ERROR',
  props<{ error: Error | string | null }>()
);

export const deleteCartProduct = createAction(
  '[Cart Page] DELETE_CART_PRODUCT',
  props<{ id: number }>()
);

export const deleteAllCartProducts = createAction(
  '[Cart Page] DELETE_ALL_CART_PRODUCTS'
);

export const deleteCartProductSuccess = createAction(
  '[Delete Cart Product Effect] DELETE_CART_PRODUCT_SUCCESS',
  props<{ id: number }>()
);

export const deleteAllCartProductsSuccess = createAction(
  '[Delete All Cart Products Effect] DELETE_ALL_CART_PRODUCTS_SUCCESS'
);

export const deleteCartProductError = createAction(
  '[Delete Cart Product Effect] DELETE_CART_PRODUCT_ERROR',
  props<{ error: Error | string | null }>()
);

export const addProductToCart = createAction(
  '[Add Product to Cart Product Page] ADD_PRODUCT_TO_CART',
  props<{ product: ProductModel }>()
);

export const increaseCartProductQuantity = createAction(
  '[Increase Quantity In Cart Product Cart Page] INCREASE_CART_PRODUCT_QUANTITY',
  props<{ cartProduct: CartProductModel }>()
);

export const decreaseCartProductQuantity = createAction(
  '[Decrease Quantity In Cart Product Cart Page] DECREASE_CART_PRODUCT_QUANTITY',
  props<{ cartProduct: CartProductModel }>()
);
