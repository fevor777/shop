import { DefaultDataServiceConfig, EntityMetadataMap } from '@ngrx/data';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductModel } from '../../../shared/model/product.model';
import { selectRouterState } from '../router';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3000/',
};

export const pluralNames = {
  Product: 'Product',
};

export const entityMetadata: EntityMetadataMap = {
  Product: {},
};

export const selectEntityCacheState = createFeatureSelector('entityCache');

export const selectProductsEntities = createSelector(
  selectEntityCacheState,
  (entityState: any) => {
    return entityState.Product.entities;
  }
);


export const selectSelectedProductByUrl = createSelector(
  selectProductsEntities,
  selectRouterState,
  (products, router): ProductModel => {
    const id = router.state.params['id'];
    if (id && products) {
      return products[id];
    } else {
      return {} as ProductModel;
    }
  }
);
