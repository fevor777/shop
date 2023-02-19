import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';

import { ProductsService } from '../../product/service/products.service';
import { ProductModel } from '../../shared/model/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductViewResolver implements Resolve<ProductModel> {

    constructor(private productService: ProductsService, private router: Router) {

    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProductModel | Observable<ProductModel> | Promise<ProductModel> {
        const id = route.paramMap.get('id');
        if (!id) {
            this.navigateToNotFoundPage();
            return EMPTY;
        }
        const emptyProduct = {} as ProductModel;
        return this.productService.getProduct(+id).pipe(
            map(product =>{
                if (product) {
                    return product;
                } else {
                    this.navigateToNotFoundPage();
                    return emptyProduct;
                }
            }),
            catchError(() => {
                this.navigateToNotFoundPage();
                return EMPTY;
            })
        );

    }

    private navigateToNotFoundPage(): void {
        this.router.navigate(['/not-found-page']);
    }
    
}