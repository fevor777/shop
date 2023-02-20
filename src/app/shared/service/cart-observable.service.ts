import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, debounceTime, delay, interval, map, Observable, repeat, retry, retryWhen, share, Subject, switchMap, take, throwError, timer } from 'rxjs';

import { HttpDataService } from '../../core/services/http-data-service';
import { CartProductModel } from '../model/cart-product.model';

@Injectable({
  providedIn: 'root',
})
export class CartObservableService
  implements HttpDataService<CartProductModel>
{
  readonly url: string = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getList(): Observable<CartProductModel[]> | Promise<CartProductModel[]> {
    return this.http
      .get<CartProductModel[]>(this.url)
      .pipe(retry(3), share(), catchError(this.handleError));
  }

  getById(id: number): Observable<CartProductModel> {
    const url = `${this.url}/${id}`;
    return this.http
      .get<CartProductModel>(url)
      .pipe(retry(3), share(), catchError(this.handleError));
  }

  update(user: Partial<CartProductModel>): Observable<CartProductModel> {
    const url = `${this.url}/${user.id}`;
    const body = JSON.stringify(user);
    return this.http
      .put<CartProductModel>(url, body)
      .pipe(retry({count: 5, delay: 2000}), catchError(this.handleError));
  }

  create(cartProduct: Partial<CartProductModel>): Observable<CartProductModel> {
    const body = JSON.stringify(cartProduct);
    return this.http
      .post<CartProductModel>(this.url, body)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<CartProductModel> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe(
      delay(500),
      retry({count: 10, delay: 1000}),
      map((b) => b as CartProductModel),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
