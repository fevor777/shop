import { Routes } from '@angular/router';

import { AdminGuard } from '../core/guard/admin.guard';
import { ProductViewResolver } from '../core/guard/prodect-view.resolver';
import { ProcessOrderComponent } from '../order/process-order.component';
import { ProductListComponent } from '../product/component/product-list/product-list.component';
import { AdminComponent } from './admin.component';
import { CanEditProductDeactivateGuard } from './can-edit-product-deactivate.guard';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

export default [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            {
                path: 'products',
                component: ProductListComponent
            },
            {
                path: 'product',
                children: [
                    {
                        path: 'add',
                        component: AddEditProductComponent
                    },
                    {
                        path: 'edit/:id',
                        resolve: {
                            product: ProductViewResolver
                        },
                        canDeactivate: [CanEditProductDeactivateGuard],
                        component: AddEditProductComponent
                    },
                ]
            },
            {
                path: 'orders',
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