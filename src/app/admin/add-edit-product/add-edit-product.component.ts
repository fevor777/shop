import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { ProductsPromiseService } from '../../product/service/products-promise.service';
import { ProductModel } from '../../shared/model/product.model';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css'],
})
export class AddEditProductComponent implements OnInit {
  product: ProductModel = {} as ProductModel;
  isSaved: boolean = false;
  oldProduct: ProductModel = {} as ProductModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productsPromiseService: ProductsPromiseService
  ) {}

  ngOnInit(): void {
    this.product =
      this.activatedRoute.snapshot.data['product'] ?? ({ isAvailable: true } as ProductModel);
    this.oldProduct = { ...this.product };
  }

  onBack(): void {
    this.router.navigate(['/admin']);
  }

  onSave(): void {
    const method = this.product.id ? 'update' : 'create';
    const productForSave = this.product.id
      ? { id: this.product.id, name: this.product.name, isAvailable: true }
      : this.product;
    this.productsPromiseService[method](productForSave).then(() => {
      this.isSaved = true;
      this.onBack();
    });
  }

  canDeactivate(): boolean {
    return this.isSaved || this.product?.name === this.oldProduct?.name;
  }
}
