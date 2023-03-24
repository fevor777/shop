import { Routes } from '@angular/router';

import { AdminGuard } from '../core/guard/admin.guard';
import { IsCartEmptyGuard } from '../core/guard/is-cart-empty.guard';
import { ProductExistsGuard } from '../core/guard/prodect-existing.guard';
import { ProductsStatePreloadingGuard } from '../core/guard/product-state-preloading.guard';
import { ProcessOrderComponent } from '../order/process-order.component';
import { ProductListComponent } from '../product/component/product-list/product-list.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { AdminComponent } from './admin.component';
import { CanEditProductDeactivateGuard } from './can-edit-product-deactivate.guard';

export default [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'products',
                component: ProductListComponent,
                canActivate: [ProductsStatePreloadingGuard],
            },
            {
                path: 'product',
                canActivate: [ProductsStatePreloadingGuard],
                children: [
                    {
                        path: 'add',
                        component: AddEditProductComponent,
                        canDeactivate: [CanEditProductDeactivateGuard],
                    },
                    {
                        path: 'edit/:id',
                        canActivate: [ProductExistsGuard],
                        canDeactivate: [CanEditProductDeactivateGuard],
                        component: AddEditProductComponent
                    },
                ]
            },
            {
                path: 'orders',
                canActivate: [IsCartEmptyGuard],
                component: ProcessOrderComponent
            },
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            }
        ]
    }
] as Routes;