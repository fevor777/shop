import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../../../login/login.service';
import { OrderByComponent } from '../../../shared/component/order-by.component';
import { ProductModel } from '../../../shared/model/product.model';
import { SelectOption } from '../../../shared/model/select-option';
import { OrderByPipe } from '../../../shared/pipes/order-by.pipe';
import { CartService } from '../../../shared/service/cart.service';
import { ProductsService } from '../../service/products.service';
import { ProductComponent } from '../product/product.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, OrderByPipe, ProductComponent, OrderByComponent, RouterModule]
})
export class ProductListComponent {

  readonly productModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name'},
    { id: 'description', name: 'Description'},
    { id: 'price', name: 'Price'},
    { id: 'category', name: 'Category'},
    { id: 'isAvailable', name: 'Availability'},
  ];

  products?: Observable<ProductModel[]>;

  sortKey: string = this.productModelKeys[0].id;
  sortOrder: boolean = true;

  constructor(
    private productsServiceService: ProductsService,
    private cartService: CartService,
    public loginService: LoginService,
    private router: Router
    ) {
    this.products = this.productsServiceService.getProducts();
  }

  onAddToCart(product: ProductModel): void {
    this.cartService.addProduct(product);
  }

  onSortKeyChange(value: SelectOption): void {
    this.sortKey = value.id;
  }

  onSortOrderChange(value: boolean): void {
    this.sortOrder = value;
  }


  onAdd(): void {
    this.router.navigate(['admin/product/add']);
  }

}
