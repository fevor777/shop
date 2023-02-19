import { Routes } from "@angular/router";
import { ProductViewResolver } from "../core/guard/prodect-view.resolver";

export default [
    { 
        path: '', 
        loadComponent: () => import('./component/product-list/product-list.component').then(mod => mod.ProductListComponent),
        children: [
            {
                path: 'product/:id',
                resolve: {
                    product: ProductViewResolver
                },
                loadComponent: () => import('./component/product-view/product-view.component').then(mod => mod.ProductViewComponent)
            },
        ]
    },
] as Routes;