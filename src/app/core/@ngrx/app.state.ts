import { CartProductsState } from './cart';

export const productsFeatureKey = 'products';
export const cartProductsFeatureKey = 'cart-products';

export interface AppState {
  [cartProductsFeatureKey]: CartProductsState;
}
