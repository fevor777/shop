import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartProductModel } from '../../../shared/model/cart-product.model';
import { CartService } from '../../../shared/service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent {

  readonly cartProducts!: Observable<CartProductModel[]>;

  constructor(public cartService: CartService) {
    this.cartProducts = this.cartService.productList;
  }

  trackByItems(index: number, item: CartProductModel): number { 
    return item.id; 
  }

  onQuantityIncrease(item: CartProductModel): void {
    this.cartService.quantityIncrease(item);
  }

  onQuantityDecrease(item: CartProductModel): void {
    this.cartService.quantityDecrease(item);
  }

  onDeleteItem(item: CartProductModel): void {
    this.cartService.deleteProduct(item);

  }

}
