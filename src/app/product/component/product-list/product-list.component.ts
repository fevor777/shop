import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { CartProductsFacade, selectUrl } from '../../../core/@ngrx';
import { OrderByComponent } from '../../../shared/component/order-by.component';
import { ProductModel } from '../../../shared/model/product.model';
import { SelectOption } from '../../../shared/model/select-option';
import { OrderByPipe } from '../../../shared/pipes/order-by.pipe';
import { ProductComponent } from '../product/product.component';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    OrderByPipe,
    ProductComponent,
    OrderByComponent,
    RouterModule,
  ],
})
export class ProductListComponent implements OnInit {
  isAdminTab$!: Observable<boolean>;

  readonly productModelKeys: SelectOption[] = [
    { id: 'name', name: 'Name' },
    { id: 'description', name: 'Description' },
    { id: 'price', name: 'Price' },
    { id: 'category', name: 'Category' },
    { id: 'isAvailable', name: 'Availability' },
  ];

  products$!: Observable<readonly ProductModel[]>;
  error$!: Observable<any>;

  sortKey: string = this.productModelKeys[0].id;
  sortOrder: boolean = true;

  private productService!: EntityCollectionService<ProductModel>;

  constructor(private store: Store, entityServices: EntityServices, private cartProductsFacade: CartProductsFacade) {
    this.productService = entityServices.getEntityCollectionService('Product');
  }

  ngOnInit(): void {
    this.products$ = this.productService.getAll();
    this.error$ = this.productService.errors$.pipe(
      map((action) => action.payload.error!)
    );
    this.isAdminTab$ = this.store
      .select(selectUrl)
      .pipe(map((url) => url.includes('admin')));
  }

  onAddToCart(product: ProductModel): void {
    this.cartProductsFacade.addProductToCart({ product });
  }

  onDeleteClick(id: number) {
    this.productService.delete(id!);
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
        path: ['/products-list/product', id],
      })
    );
  }

  onEditClick(id: number): void {
    this.store.dispatch(
      RouterActions.go({
        path: ['/admin/product/edit', id],
      })
    );
  }
}
