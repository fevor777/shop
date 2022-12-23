import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProductModel } from '../../../shared/model/cart-product.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {

  @Input() item!: CartProductModel;

  @Output() quantityIncrease: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() quantityDecrease: EventEmitter<CartProductModel> = new EventEmitter();
  @Output() deleteItem: EventEmitter<CartProductModel> = new EventEmitter();

  onQuantityIncrease(item: CartProductModel): void {
    this.quantityIncrease.emit(item);
  }

  onQuantityDecrease(item: CartProductModel): void {
    this.quantityDecrease.emit(item);
  }

  onDeleteItem(item: CartProductModel): void {
    this.deleteItem.emit(item);
  }

}
