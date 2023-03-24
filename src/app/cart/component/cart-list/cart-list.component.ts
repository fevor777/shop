import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCartProductsData, selectCartProductsTotalCost, selectCartProductsTotalQuantity } from '../../../core/@ngrx';
import * as CartProductsActions from '../../../core/@ngrx';
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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.cartProducts$ = this.store.select(selectCartProductsData);
    this.totalCost$ = this.store.select(selectCartProductsTotalCost);
    this.totalQuantity$ = this.store.select(selectCartProductsTotalQuantity);
  }

  trackByItems(index: number, item: CartProductModel): number {
    return item.id;
  }

  onQuantityIncrease(item: CartProductModel): void {
    this.store.dispatch(CartProductsActions.increaseCartProductQuantity({ cartProduct: item }));
  }

  onQuantityDecrease(item: CartProductModel): void {
    this.store.dispatch(CartProductsActions.decreaseCartProductQuantity({ cartProduct: item }));
  }

  onDeleteItem(item: CartProductModel): void {
    this.store.dispatch(CartProductsActions.deleteCartProduct({ id: item.id }));
  }

  onSortKeyChange(value: SelectOption): void {
    this.sortKey = value.id;
  }

  onSortOrderChange(value: boolean): void {
    this.sortOrder = value;
  }

  onDeleteAll(): void {
    this.store.dispatch(CartProductsActions.deleteAllCartProducts());
  }
}
