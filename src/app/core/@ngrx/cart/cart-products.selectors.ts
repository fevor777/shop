import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cartProductsFeatureKey } from '../app.state';
import { CartProductsState } from './cart-products.state';

export const selectCartProductsState = createFeatureSelector<CartProductsState>(
  cartProductsFeatureKey
);

export const selectCartProductsData = createSelector(
  selectCartProductsState,
  (state: CartProductsState) => state.data
);

export const selectCartProductsExisting = createSelector(
  selectCartProductsState,
  (state: CartProductsState): boolean => !!state.data.length
);

export const selectCartProductsTotalCost = createSelector(
  selectCartProductsState,
  (state: CartProductsState): number =>
    state.data.map((p) => p.count * p.price).reduce((r, c) => r + c, 0)
);

export const selectCartProductsTotalQuantity = createSelector(
  selectCartProductsState,
  (state: CartProductsState): number =>
    state.data.map((p) => p.count).reduce((r, c) => r + c, 0)
);

export const selectCartProductsLoaded = createSelector(
  selectCartProductsState,
  (state: CartProductsState) => state.loaded
);
