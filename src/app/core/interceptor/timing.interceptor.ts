import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const startDate = new Date();
    return next.handle(request).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      tap((event: HttpEvent<any>) => {
        if ((event as HttpResponse<any>).url?.includes('products')) {
          const endDate = new Date();
          console.log('products request: ', Math.abs(endDate.getMilliseconds() - startDate.getMilliseconds()), ' milliseconds');
        }
        return event;
      })
    );
  }
}

export const timingInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TimingInterceptor,
  multi: true
}
