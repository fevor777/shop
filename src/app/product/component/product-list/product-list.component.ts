import { Component } from '@angular/core';
import { ProductModel } from '../../../shared/model/product.model';
import { ProductsServiceService } from '../../service/products-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: ProductModel[] = [];

  constructor(private productsServiceService: ProductsServiceService) {
    this.products = this.productsServiceService.getProducts();
  }

}
