import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../../../login/login.service';
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
  isAdminTab: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public loginService: LoginService) {
    this.isAdminTab = this.router.url.includes('admin');
  }


  onAddToCart(product: ProductModel): void {
    if (product?.isAvailable) {
      this.addProductToCart.emit(product);
    }
  }

  onDetailsClick(): void {
    this.router.navigate(['product', this.item?.id], { relativeTo: this.route }); 
  }


  onEdit(id: number): void {
    this.router.navigate(['admin/product/edit', id]);
  }
}
