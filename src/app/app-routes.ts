import { Routes } from '@angular/router';

import { AdminGuard } from './core/guard/admin.guard';
import { IsCartEmptyGuard } from './core/guard/is-cart-empty.guard';

export default [
  {
    path: 'products-list',
    loadChildren: () => import('./product/product-routes'),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/component/cart-list/cart-list.component').then(
        (mod) => mod.CartListComponent
      ),
  },
  {
    path: 'order',
    canActivate: [IsCartEmptyGuard],
    loadComponent: () =>
      import('./order/process-order.component').then(
        (mod) => mod.ProcessOrderComponent
      ),
  },
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () => import('./admin/admin-routes'),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((mod) => mod.LoginComponent),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent
      ),
  },
  {
    path: '',
    redirectTo: 'products-list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
  },
] as Routes;
