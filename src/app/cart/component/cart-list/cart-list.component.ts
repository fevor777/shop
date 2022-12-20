import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProductModel } from '../../../shared/model/cart-product.model';
import { CartService } from '../../../shared/service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent {

  readonly cartProducts!: Observable<CartProductModel[]>;

  constructor(private cartService: CartService) {
    this.cartProducts = this.cartService.productList;
  }

  trackByItems(index: number, item: CartProductModel): number { 
    return item.id; 
  }

}
