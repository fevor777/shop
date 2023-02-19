import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderByComponent } from '../../../shared/component/order-by.component';
import { CartProductModel } from '../../../shared/model/cart-product.model';
import { SelectOption } from '../../../shared/model/select-option';
import { OrderByPipe } from '../../../shared/pipes/order-by.pipe';
import { CartService } from '../../../shared/service/cart.service';
import { SharedModule } from '../../../shared/shared.module';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CartItemComponent, CommonModule, SharedModule, OrderByPipe, OrderByComponent, RouterModule]
})
export class CartListComponent {

  readonly cartProducts!: Observable<CartProductModel[]>;

  readonly cartProductModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name'},
    { id: 'count', name: 'Count'},
    { id: 'price', name: 'Price'},
  ];

  sortKey: string = this.cartProductModelKeys[0].id;
  sortOrder: boolean = true;

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

  onSortKeyChange(value: SelectOption): void {
    this.sortKey = value.id;
  }

  onSortOrderChange(value: boolean): void {
    this.sortOrder = value;
  }

}
