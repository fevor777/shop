import { Injectable } from '@angular/core';

import { Category } from '../../shared/model/category';
import { ProductModel } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  getProducts(): ProductModel[] {
    return [
      { 
        id: 111,
        name: 'Product 1',
        description: 'description for Product 1',
        price: 101,
        category: Category.C1,
        isAvailable: true
      },
      { 
        id: 222,
        name: 'Product 2',
        description: 'description for Product 2',
        price: 102,
        category: Category.C2,
        isAvailable: true
      },
      { 
        id: 333,
        name: 'Product 3',
        description: 'description for Product 3',
        price: 103,
        category: Category.C3,
        isAvailable: true
      }
    ];
  }
}
