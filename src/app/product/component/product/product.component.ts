import { Component, Input } from '@angular/core';

import { CartService } from '../../../shared/service/cart.service';
import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() item!: ProductModel;

  constructor(private cartService: CartService) { }

  onAddToCart(product: ProductModel): void {
    this.cartService.addProduct(product);
  }
}
