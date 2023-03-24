import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { AppState, selectProductsData, selectProductsError, selectUrl } from '../../../core/@ngrx';
import { OrderByComponent } from '../../../shared/component/order-by.component';
import { ProductModel } from '../../../shared/model/product.model';
import { SelectOption } from '../../../shared/model/select-option';
import { OrderByPipe } from '../../../shared/pipes/order-by.pipe';
import { ProductComponent } from '../product/product.component';
import * as CartProductsActions from './../../../core/@ngrx/cart/cart-products.actions';
import * as ProductsActions from './../../../core/@ngrx/products/products.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, OrderByPipe, ProductComponent, OrderByComponent, RouterModule]
})
export class ProductListComponent implements OnInit {

  isAdminTab$!: Observable<boolean>;

  readonly productModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name'},
    { id: 'description', name: 'Description'},
    { id: 'price', name: 'Price'},
    { id: 'category', name: 'Category'},
    { id: 'isAvailable', name: 'Availability'},
  ];

  products$!: Observable<readonly ProductModel[]>;
  error$!: Observable<any>;

  sortKey: string = this.productModelKeys[0].id;
  sortOrder: boolean = true;

  constructor(
    private store: Store<AppState>
    ) {
  }

  ngOnInit(): void {
      this.products$ = this.store.select(selectProductsData);
      this.error$ = this.store.select(selectProductsError);
      this.isAdminTab$ = this.store.select(selectUrl).pipe(map((url) => url.includes('admin')));
  }

  onAddToCart(product: ProductModel): void {
    this.store.dispatch(CartProductsActions.addProductToCart({ product }));
  }

  onDeleteClick(id: number) {
    this.store.dispatch(ProductsActions.deleteProduct({ id }));
  }

  onSortKeyChange(value: SelectOption): void {
    this.sortKey = value.id;
  }

  onSortOrderChange(value: boolean): void {
    this.sortOrder = value;
  }


  onAdd(): void {
    this.store.dispatch(
      RouterActions.go({
        path: ['/admin/product/add'],
      })
    );
  }

  onDetailsClick(id: number): void {
    this.store.dispatch(
      RouterActions.go({
        path: ['/products-list/product', id]
      })
    );
  }


  onEditClick(id: number): void {
    this.store.dispatch(
      RouterActions.go({
        path: ['/admin/product/edit', id]
      })
    );
  }

}
