import type {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import type { RouterStateSerializer } from '@ngrx/router-store';
import type { RouterStateUrl } from './router.state';

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route: ActivatedRouteSnapshot = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, fragment, data } = route;
    return { url, queryParams, params, fragment, data };
  }
}
