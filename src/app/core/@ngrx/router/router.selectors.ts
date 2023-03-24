import { createFeatureSelector } from '@ngrx/store';

import { type RouterReducerState, getSelectors } from '@ngrx/router-store';
import type { RouterStateUrl } from './router.state';

const routerFeatureKey = 'router';
export const selectRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>(routerFeatureKey);

  export const {
    selectQueryParams,
    selectRouteParams,
    selectRouteData,
    selectUrl
   } = getSelectors(selectRouterState);