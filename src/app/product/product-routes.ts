import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProductsEffects, productsFeatureKey, productsReducer } from '../core/@ngrx';
import { ProductExistsGuard } from '../core/guard/prodect-existing.guard';
import { ProductsStatePreloadingGuard } from '../core/guard/product-state-preloading.guard';

export default [
    { 
        path: '',
        canActivate: [ProductsStatePreloadingGuard],
        providers: [
            importProvidersFrom(
                StoreModule.forFeature(productsFeatureKey, productsReducer),
                EffectsModule.forFeature([ProductsEffects])
            )
        ],
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