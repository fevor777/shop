import { Routes } from '@angular/router';

import { ProductExistsGuard } from '../core/guard/prodect-existing.guard';
import { ProductsStatePreloadingGuard } from '../core/guard/product-state-preloading.guard';

export default [
    { 
        path: '',
        canActivate: [ProductsStatePreloadingGuard],
        loadComponent: () => import('./component/product-list/product-list.component').then(mod => mod.ProductListComponent),
        children: [
            {
                path: 'product/:id',
                canActivate: [ProductExistsGuard],
                loadComponent: () => import('./component/product-view/product-view.component').then(mod => mod.ProductViewComponent)
            },
        ]
    },
] as Routes;