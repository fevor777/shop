import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LoginService } from '../../../login/login.service';
import { OrderByComponent } from '../../../shared/component/order-by.component';
import { ProductModel } from '../../../shared/model/product.model';
import { SelectOption } from '../../../shared/model/select-option';
import { OrderByPipe } from '../../../shared/pipes/order-by.pipe';
import { CartService } from '../../../shared/service/cart.service';
import { ProductsPromiseService } from '../../service/products-promise.service';
import { ProductComponent } from '../product/product.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, OrderByPipe, ProductComponent, OrderByComponent, RouterModule]
})
export class ProductListComponent implements OnDestroy {

  private readonly destroy: Subject<void> = new Subject();
  
  isAdminTab: boolean = false;

  readonly productModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name'},
    { id: 'description', name: 'Description'},
    { id: 'price', name: 'Price'},
    { id: 'category', name: 'Category'},
    { id: 'isAvailable', name: 'Availability'},
  ];

  products?: Promise<ProductModel[]>;

  sortKey: string = this.productModelKeys[0].id;
  sortOrder: boolean = true;

  constructor(
    private productsPromiseService: ProductsPromiseService,
    private cartService: CartService,
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute, 
    ) {
    this.products = this.productsPromiseService.getList();
    this.isAdminTab = this.router.url.includes('admin');
  }

  onAddToCart(product: ProductModel): void {
    this.cartService.addProduct(product)
      .pipe(takeUntil(this.destroy))
      .subscribe();
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

  onReload(): void {
    this.products = this.productsPromiseService.getList();
  }

  onDetailsClick(id: number): void {
    this.router.navigate(['product', id], { relativeTo: this.route });
  }


  onEditClick(id: number): void {
    this.router.navigate(['admin/product/edit', id]);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.destroy.unsubscribe();
  }

}
