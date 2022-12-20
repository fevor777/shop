import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProductModel } from '../model/cart-product.model';

import { ProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly productListSubject: BehaviorSubject<CartProductModel[]> = new BehaviorSubject<CartProductModel[]>([]);
  readonly productList: Observable<CartProductModel[]> =this.productListSubject.asObservable();

  getProductList(): CartProductModel[] {
    return this.productListSubject.getValue();
  }

  setProductList(products: CartProductModel[]): void {
    this.productListSubject.next(products);
  }

  addProduct(product: ProductModel): void {
    const products = this.getProductList();
    let updatedProducts = products;
    if (product && Array.isArray(products)) {
      const productInList = products.find((p) => p.id === product.id);
      if (productInList) {
        productInList.count += 1;
      } else {
        updatedProducts = [ ...products, { ...product, count: 1}];
      }
      this.productListSubject.next(updatedProducts);
    }
  }
}
