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

  get totalCost(): number {
    let result = 0;
    const products = this.getProductList();
    if (Array.isArray(products) && products.length > 0) {
      result = products.map(p => p.count * p.price).reduce((r, c) => r + c);
    }
    return result;
  }

  get totalQuantity(): number {
    let result = 0;
    const products = this.getProductList();
    if (Array.isArray(products) && products.length > 0) {
      result = products.map(p => p.count).reduce((r, c) => r + c);
    } 
    return result;
  }

  getProductList(): CartProductModel[] {
    return this.productListSubject.getValue();
  }

  setProductList(products: CartProductModel[]): void {
    this.productListSubject.next(products);
  }

  quantityIncrease(product: ProductModel): void {
    const products = this.getProductList();
    let updatedProducts = [ ...products];
    if (product && Array.isArray(products)) {
      const index = updatedProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const p = updatedProducts[index];
        updatedProducts[index] = { ...p, count: ++p.count };
      } else {
        updatedProducts = [ ...products, { ...product, count: 1}];
      }
      this.productListSubject.next(updatedProducts);
    }
  }

  quantityDecrease(product: ProductModel): void {
    const products = this.getProductList();
    let updatedProducts = [ ...products];
    if (product && Array.isArray(products)) {
      const index = updatedProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
      updatedProducts[index] = { ... updatedProducts[index]};
      let productInList = updatedProducts[index];
        if (productInList.count > 1) {
          productInList.count -= 1;
          this.productListSubject.next(updatedProducts);
        } else {
          this.deleteProduct(productInList);
        }
      }
    }
  }

  deleteProduct(product: ProductModel): void {
    const products = this.getProductList();
    if (product && Array.isArray(products)) {
      const updatedProducts = products.filter((p) => p.id !== product.id);
      this.productListSubject.next(updatedProducts);
    }
  }
}
