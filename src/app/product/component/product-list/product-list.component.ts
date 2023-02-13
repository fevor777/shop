import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProductModel } from '../../../shared/model/product.model';
import { CartService } from '../../../shared/service/cart.service';
import { ProductsServiceService } from '../../service/products-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

  products: ProductModel[] = [];

  constructor(
    private productsServiceService: ProductsServiceService,
    private cartService: CartService
    ) {
    this.products = this.productsServiceService.getProducts();
  }

  onAddToCart(product: ProductModel): void {
    this.cartService.addProduct(product);
  }

}
