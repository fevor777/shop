import { CartProductsState } from './cart';
import type { ProductsState } from './products';

export const productsFeatureKey = 'products';
export const cartProductsFeatureKey = 'cart-products';

export interface AppState {
  [productsFeatureKey]: ProductsState;
  [cartProductsFeatureKey]: CartProductsState;
}
