import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

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
export class CartListComponent implements OnDestroy, OnInit {
  cartProducts: CartProductModel[] = [];

  private readonly destroy: Subject<void> = new Subject();

  readonly cartProductModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name' },
    { id: 'count', name: 'Count' },
    { id: 'price', name: 'Price' },
  ];

  sortKey: string = this.cartProductModelKeys[0].id;
  sortOrder: boolean = true;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartProducts();
  }

  trackByItems(index: number, item: CartProductModel): number {
    return item.id;
  }

  onQuantityIncrease(item: CartProductModel): void {
    this.cartService
      .quantityIncrease(item)
      .pipe(takeUntil(this.destroy))
      .subscribe((p) => this.updateCartProducts(p));
  }

  onQuantityDecrease(item: CartProductModel): void {
    this.cartService
      .quantityDecrease(item)
      .pipe(takeUntil(this.destroy))
      .subscribe((p) => this.updateCartProducts(p));
  }

  onDeleteItem(item: CartProductModel): void {
    this.cartService
      .removeProduct(item.id)
      .pipe(takeUntil(this.destroy))
      .subscribe((p) => this.updateCartProducts(p));
  }

  onSortKeyChange(value: SelectOption): void {
    this.sortKey = value.id;
  }

  onSortOrderChange(value: boolean): void {
    this.sortOrder = value;
  }

  onDeleteAll(): void {
    this.cartService
      .removeAllProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe((p) => this.updateCartProducts(p));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy.unsubscribe();
  }

  private loadCartProducts(): void {
    this.cartService
      .getCartProducts()
      .pipe(takeUntil(this.destroy))
      .subscribe((p) => (this.cartProducts = p));
  }

  private updateCartProducts(cart: CartProductModel[]): void {
    this.cartProducts = [ ...cart ];
  }
}
