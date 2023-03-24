import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { CartProductsFacade } from '../../../core/@ngrx';
import { OrderByComponent } from '../../../shared/component/order-by.component';
import { CartProductModel } from '../../../shared/model/cart-product.model';
import { SelectOption } from '../../../shared/model/select-option';
import { OrderByPipe } from '../../../shared/pipes/order-by.pipe';
import { SharedModule } from '../../../shared/shared.module';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
  standalone: true,
  imports: [
    CartItemComponent,
    CommonModule,
    SharedModule,
    OrderByPipe,
    OrderByComponent,
    RouterModule,
  ],
})
export class CartListComponent implements OnInit {
  cartProducts$!: Observable<readonly CartProductModel[]>;
  totalCost$!: Observable<number>;
  totalQuantity$!: Observable<number>;

  readonly cartProductModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name' },
    { id: 'count', name: 'Count' },
    { id: 'price', name: 'Price' },
  ];

  sortKey: string = this.cartProductModelKeys[0].id;
  sortOrder: boolean = true;

  constructor(private cartProductsFacade: CartProductsFacade) {}

  ngOnInit(): void {
    this.cartProducts$ = this.cartProductsFacade.cartProducts$;
    this.totalCost$ = this.cartProductsFacade.cartProductsTotalCost$;
    this.totalQuantity$ = this.cartProductsFacade.cartProductsTotalQuantity$;
  }

  trackByItems(index: number, item: CartProductModel): number {
    return item.id;
  }

  onQuantityIncrease(item: CartProductModel): void {
    this.cartProductsFacade.increaseCartProductQuantity({ cartProduct: item });
  }

  onQuantityDecrease(item: CartProductModel): void {
    this.cartProductsFacade.decreaseCartProductQuantity({ cartProduct: item });
  }

  onDeleteItem(item: CartProductModel): void {
    this.cartProductsFacade.deleteCartProduct({ id: item.id });
  }

  onSortKeyChange(value: SelectOption): void {
    this.sortKey = value.id;
  }

  onSortOrderChange(value: boolean): void {
    this.sortOrder = value;
  }

  onDeleteAll(): void {
    this.cartProductsFacade.deleteAllCartProduct();
  }
}
