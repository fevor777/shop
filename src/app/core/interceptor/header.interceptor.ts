import { HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, type Provider } from '@angular/core';
import { Observable } from 'rxjs';

import type { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let clonedRequest = request;
    if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') {
      clonedRequest = request.clone({ headers: new HttpHeaders({'Content-Type': 'application/json'})});
    }
    return next.handle(clonedRequest);
  }
}

export const headerInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
}
