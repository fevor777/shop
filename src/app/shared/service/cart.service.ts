import { Injectable } from '@angular/core';
import { concatMap, forkJoin, Observable, of, switchMap, tap } from 'rxjs';

import { CartProductModel } from '../model/cart-product.model';
import { ProductModel } from '../model/product.model';
import { CartObservableService } from './cart-observable.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  totalCost: number = 0;
  totalQuantity: number = 0;
  cartProductsLength: number = 0;

  constructor(private cartObservableService: CartObservableService) {}

  getCartProducts(): Observable<CartProductModel[]> {
    return (
      this.cartObservableService.getList() as Observable<CartProductModel[]>
    ).pipe(tap((items) => this.updateInfo(items)));
  }

  updateCartProduct(product: CartProductModel): Observable<CartProductModel> {
    return this.cartObservableService.update(product);
  }

  addProduct(product: ProductModel): Observable<CartProductModel[]> {
    return (
      this.cartObservableService.getList() as Observable<CartProductModel[]>
    ).pipe(
      concatMap((products) => {
        let obs;
        if (Array.isArray(products) && products.length > 0) {
          const cartProduct = products.find((p) => p.id === product.id);
          if (cartProduct) {
            obs = this.quantityIncrease(cartProduct);
          } else {
            obs = this.cartObservableService.create({ ...product, count: 1 });
          }
        } else {
          obs = this.cartObservableService.create({ ...product, count: 1 });
        }
        return obs;
      }),
      concatMap(() => this.getCartProducts())
    );
  }

  quantityIncrease(product: CartProductModel): Observable<CartProductModel[]> {
    return this.changeQuantity(product, 1);
  }

  quantityDecrease(product: CartProductModel): Observable<CartProductModel[]> {
    return this.changeQuantity(product, -1);
  }

  removeProduct(id: number): Observable<CartProductModel[]> {
    return this.cartObservableService.delete(id)
      .pipe(concatMap(() => this.getCartProducts()));
  }

  removeAllProducts(): Observable<CartProductModel[]> {
    return (
      this.cartObservableService.getList() as Observable<CartProductModel[]>
    ).pipe(
      switchMap((products) => {
        let obs = [of({} as CartProductModel)];
        if (Array.isArray(products) && products.length > 0) {
          obs = products.map((p) => this.cartObservableService.delete(p.id));
        }
        return forkJoin(obs);
      }),
      concatMap(() => this.getCartProducts())
    );
  }

  isEmptyCart(): boolean {
    return this.cartProductsLength === 0;
  }

  updateInfo(cartProduct: CartProductModel[]): void {
    this.updateTotalCost(cartProduct);
    this.updateTotalQuantity(cartProduct);
    this.updateCartProductsLength(cartProduct);
  }

  private changeQuantity(
    product: CartProductModel,
    count: number
  ): Observable<CartProductModel[]> {
    const newCount = product.count + count;
    if (newCount <= 0) {
      return this.removeProduct(product.id)
        .pipe(concatMap(() => this.getCartProducts()));;
    } else {
      return this.updateCartProduct({
        ...product,
        count: newCount,
      } as CartProductModel)
        .pipe(concatMap(() => this.getCartProducts()));;
    }
  }

  private updateTotalCost(cartProduct: CartProductModel[]) {
    let result = 0;
    if (Array.isArray(cartProduct) && cartProduct.length > 0) {
      result = cartProduct
        .map((p) => p.count * p.price)
        .reduce((r, c) => r + c);
    }
    this.totalCost = result;
  }

  private updateTotalQuantity(cartProduct: CartProductModel[]) {
    let result = 0;
    if (Array.isArray(cartProduct) && cartProduct.length > 0) {
      result = cartProduct.map((p) => p.count).reduce((r, c) => r + c);
    }
    this.totalQuantity = result;
  }

  private updateCartProductsLength(cartProduct: CartProductModel[]) {
    let result = 0;
    if (Array.isArray(cartProduct)) {
      result = cartProduct.length;
    }
    this.cartProductsLength = result;
  }
}
