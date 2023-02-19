import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { CartProductModel } from '../model/cart-product.model';

import { ProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cartProductsSubject: BehaviorSubject<CartProductModel[]> = new BehaviorSubject<CartProductModel[]>([]);
  readonly cartProducts: Observable<CartProductModel[]> =this.cartProductsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.initCart();
  }

  get totalCost(): number {
    let result = 0;
    const products = this.getCartProducts();
    if (Array.isArray(products) && products.length > 0) {
      result = products.map(p => p.count * p.price).reduce((r, c) => r + c);
    }
    return result;
  }

  get totalQuantity(): number {
    let result = 0;
    const products = this.getCartProducts();
    if (Array.isArray(products) && products.length > 0) {
      result = products.map(p => p.count).reduce((r, c) => r + c);
    } 
    return result;
  }

  getCartProducts(): CartProductModel[] {
    return this.cartProductsSubject.getValue();
  }

  setCartProducts(products: CartProductModel[]): void {
    this.localStorageService.setItem('cartProduct', JSON.stringify(products));
    this.cartProductsSubject.next(products);
  }

  addProduct(product: ProductModel): void {
    if (product) {
      const products = this.getCartProducts();
      const newCartProduct = { ...product, count: 1};
      if (Array.isArray(products) && products.length > 0) {
        const cartProduct = products.find((p) => p.id === product.id);
        if (cartProduct) {
          this.quantityIncrease(product);
        } else {
          const updatedProducts = [ ...products, newCartProduct];
          this.setCartProducts(updatedProducts);
        }
      } else {
        this.setCartProducts([newCartProduct]);
      }
    }
  }

  quantityIncrease(product: ProductModel): void {
    this.changeQuantity(product, 1);
  }

  quantityDecrease(product: ProductModel): void {
    this.changeQuantity(product, -1);
  }

  removeProduct(product: ProductModel): void {
    const products = this.getCartProducts();
    if (product && Array.isArray(products)) {
      const updatedProducts = products.filter((p) => p.id !== product.id);
      this.setCartProducts(updatedProducts);
    }
  }

  removeAllProducts(): void {
    this.setCartProducts([]);
  }

  isEmptyCart(): boolean {
    return this.getCartProducts()?.length === 0; 
  }

  private changeQuantity(product: ProductModel, count: number): void {
    const products = this.getCartProducts();
    if (product && Array.isArray(products)) {
      let updatedProducts = [ ...products];
      const index = updatedProducts.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        const p = updatedProducts[index];
        updatedProducts[index] = { ...p, count: p.count + count };
        if (updatedProducts[index].count === 0) {
          this.removeProduct(product);
        } else {
          this.setCartProducts(updatedProducts);
        }
      }
    }
  }

  private initCart(): void {
    const productsJson = this.localStorageService.getItem('cartProduct');
    if (productsJson) {
      try {
        const products = JSON.parse(productsJson);
        this.setCartProducts(products);
      } catch (er) {
        console.log(er);
      }
    }
  }
}
