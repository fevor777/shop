import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { catchError, filter, Observable, of, take, tap } from 'rxjs';

import { ProductModel } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsStatePreloadingGuard implements CanActivate {

  private productService!: EntityCollectionService<ProductModel>;
  constructor(entityServices: EntityServices) {
    this.productService = entityServices.getEntityCollectionService('Product');
  }

  canActivate(): Observable<boolean> {
    return this.productService.loaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.productService.getAll();
        }
      }),
      filter((loaded: boolean) => loaded),
      take(1),
      catchError(() => of(false))
    );
  }
}
