import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductModel } from '../../shared/model/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit  {

  product: ProductModel = {} as ProductModel;
  isSaved: boolean = false;
  oldProduct: ProductModel = {} as ProductModel;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.oldProduct = { ...this.product };
  }

  onBack(): void {
    this.router.navigate(['/admin']);
  }

  onSave(): void {
    this.isSaved = true;
    this.onBack();
  }

  canDeactivate(): boolean {
    return this.isSaved || this.product?.name === this.oldProduct?.name;
  }

}
