import { CartProductModel } from '../../../shared/model/cart-product.model';

export interface CartProductsState {
  data: ReadonlyArray<CartProductModel>;
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string | null;
}

export const initialCartProductsState: CartProductsState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};
