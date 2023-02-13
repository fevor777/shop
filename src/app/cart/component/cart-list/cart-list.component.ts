import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartProductModel } from '../../../shared/model/cart-product.model';
import { CartService } from '../../../shared/service/cart.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CartItemComponent, CommonModule, SharedModule]
})
export class CartListComponent {

  readonly cartProducts!: Observable<CartProductModel[]>;

  constructor(public cartService: CartService) {
    this.cartProducts = this.cartService.cartProducts;
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
    this.cartService.removeProduct(item);

  }

}
