import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

import { selectSelectedProductByUrl } from '../../core/@ngrx';
import * as ProductsActions from '../../core/@ngrx/products/products.actions';
import { ProductModel } from '../../shared/model/product.model';
import * as RouterActions from './../../core/@ngrx/router/router.actions';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  product: ProductModel = {} as ProductModel;

  @ViewChild('form', { static: false })
  productForm!: NgForm;

  private originalProduct: ProductModel = {} as ProductModel;
  private isSaved: boolean = false;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSelectedProductByUrl)
      .pipe(take(1))
      .subscribe((pr) => {
        this.product = { ...pr };
        this.originalProduct = { ...pr };
      });
  }

  onBack(): void {
    this.store.dispatch(RouterActions.back());
  }

  onSave(): void {
    this.isSaved = true;
    const product = { ...this.product } as ProductModel;
    if (this.product.id) {
      this.store.dispatch(ProductsActions.updateProduct({ product }));
    } else {
      this.store.dispatch(ProductsActions.createProduct({ product }));
    }
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isSaved) {
      return true;
    }
    if (this.productForm.pristine) {
      return true;
    }
    const flags = (
      Object.keys(this.product) as (keyof ProductModel)[]
    ).map((key) => {
      if (this.originalProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });
    if (flags.every((el) => el)) {
      return true;
    }
    return confirm('Discard changes?');
  }
}
