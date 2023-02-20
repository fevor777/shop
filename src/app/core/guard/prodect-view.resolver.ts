import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

import { ProductsPromiseService } from '../../product/service/products-promise.service';
import { ProductModel } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductViewResolver implements Resolve<ProductModel> {
  constructor(
    private productService: ProductsPromiseService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ProductModel | Observable<ProductModel> | Promise<ProductModel> {
    const id = route.paramMap.get('id');
    if (!id) {
      this.navigateToNotFoundPage();
      return EMPTY;
    }
    const emptyProduct = { isAvailable: true } as ProductModel;
    return this.productService
      .getById(+id)
      .then((product) => {
        if (product) {
          return product;
        } else {
          this.navigateToNotFoundPage();
          return emptyProduct;
        }
      })
      .catch((error) => {
        console.log(error);
        this.navigateToNotFoundPage();
        return emptyProduct;
      });
  }

  private navigateToNotFoundPage(): void {
    this.router.navigate(['/not-found-page']);
  }
}
