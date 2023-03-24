import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ProductModel } from '../../../shared/model/product.model';

export interface ProductsState extends EntityState<ProductModel> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string | null;
}

export const adapter: EntityAdapter<ProductModel> = createEntityAdapter<ProductModel>();

export const initialProductsState: ProductsState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});
