import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../../shared/model/product.model';

export const getProducts = createAction(
  '[Product List Page (App)] GET_PRODUCTS'
);

export const getProductsSuccess = createAction(
  '[Get Products Effect] GET_PRODUCTS_SUCCESS',
  props<{ products: ProductModel[] }>()
);

export const getProductsError = createAction(
  '[Get Products Effect] GET_PRODUCTS_ERROR',
  props<{ error: Error | string | null }>()
);

export const createProduct = createAction(
  '[Product Form Page] CREATE_PRODUCT',
  props<{ product: ProductModel }>()
);

export const createProductSuccess = createAction(
  '[Create Product Effect] CREATE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);

export const createProductError = createAction(
  '[Create Product Effect] CREATE_PRODUCT_ERROR',
  props<{ error: Error | string | null }>()
);

export const updateProduct = createAction(
  '[Product Form Page] UPDATE_PRODUCT',
  props<{ product: ProductModel }>()
);

export const updateProductSuccess = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_SUCCESS',
  props<{ product: ProductModel }>()
);

export const updateProductError = createAction(
  '[Update Product Effect] UPDATE_PRODUCT_ERROR',
  props<{ error: Error | string | null }>()
);

export const deleteProduct = createAction(
  '[Product List Page] DELETE_PRODUCT',
  props<{ id: number }>()
);

export const deleteProductSuccess = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_SUCCESS',
  props<{ id: number }>()
);

export const deleteProductError = createAction(
  '[Delete Product Effect] DELETE_PRODUCT_ERROR',
  props<{ error: Error | string | null }>()
);
