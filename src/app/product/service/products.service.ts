import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { Category } from '../../shared/model/category';
import { ProductModel } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  getProducts(): Observable<ProductModel[]> {
    return of([
      { 
        id: 111,
        name: 'X Product 1',
        description: 'A description for Product 1',
        price: 500,
        category: Category.C1,
        isAvailable: false
      },
      { 
        id: 222,
        name: 'T Product 2',
        description: 'D description for Product 2',
        price: 50,
        category: Category.C2,
        isAvailable: true
      },
      { 
        id: 333,
        name: 'H Product 3',
        description: 'O description for Product 3',
        price: 103,
        category: Category.C3,
        isAvailable: false
      },
      { 
        id: 444,
        name: ' L Product 4',
        description: 'B description for Product 4',
        price: 144,
        category: Category.C2,
        isAvailable: true
      },
      { 
        id: 555,
        name: 'S Product 5',
        description: 'Q description for Product 5',
        price: 10,
        category: Category.C1,
        isAvailable: true
      }
    ]);
  }

  getProduct(id: NonNullable<ProductModel['id']> | number): Observable<ProductModel | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((p) => p?.id === id))
    )
  }
}
