import type { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environment';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action: ', action);
    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [debug]
  : [];
