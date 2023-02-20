import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { HttpDataService } from '../../core/services/http-data-service';
import { ProductModel } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsPromiseService implements HttpDataService<ProductModel> {

  readonly url: string = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  getList(): Promise<ProductModel[]> {
    return firstValueFrom(this.httpClient.get(this.url))
      .then(res => res as ProductModel[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<ProductModel> {
    const urlWithId = `${this.url}/${id}`;
    return firstValueFrom(this.httpClient.get(urlWithId))
      .then(res => res as ProductModel)
      .catch(this.handleError);
  }

  update(product: Partial<ProductModel>): Promise<ProductModel> {
    const urlWithId = `${this.url}/${product.id}`;
    const req = this.httpClient.patch(urlWithId, product);
    return firstValueFrom(req)
      .then(response => response as ProductModel)
      .catch(this.handleError);
  }

  create(product: Partial<ProductModel>): Promise<ProductModel> {
    return firstValueFrom(this.httpClient.post(this.url, product))
      .then(response => response as ProductModel)
      .catch(this.handleError);
  }

  delete(id: number): Promise<unknown> {
    const req = this.httpClient.delete(`${this.url}/${id}`);
    return firstValueFrom(req)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
