import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class ProductComponent {
  @Input() item!: ProductModel;
  @Input() isAdminTab: boolean | null = false;

  @Output() addProductToCart: EventEmitter<ProductModel> = new EventEmitter();
  @Output() detailsClick: EventEmitter<number> = new EventEmitter();
  @Output() editClick: EventEmitter<number> = new EventEmitter();
  @Output() deleteClick: EventEmitter<number> = new EventEmitter();

  onAddToCart(product: ProductModel): void {
    if (product?.isAvailable) {
      this.addProductToCart.emit(product);
    }
  }

  onDetailsClick(): void {
    this.detailsClick.emit(this.item?.id);
  }

  onEdit(id: number): void {
    this.editClick.emit(id);
  }

  onDelete(id: number): void {
    this.deleteClick.emit(id);
  }
}
