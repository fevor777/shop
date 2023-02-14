import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class ProductComponent {

  @Input() item!: ProductModel;
  @Output() addProductToCart: EventEmitter<ProductModel> = new EventEmitter();


  onAddToCart(product: ProductModel): void {
    if (product?.isAvailable) {
      this.addProductToCart.emit(product);
    }
  }
}
