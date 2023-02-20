import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import appRoutes from './app/app-routes';
import { AppComponent } from './app/app.component';
import { carInitializerProvider } from './app/core/guard/cart.initializer';
import { headerInterceptorProvider } from './app/core/interceptor/header.interceptor';
import { timingInterceptorProvider } from './app/core/interceptor/timing.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    carInitializerProvider,
    importProvidersFrom(HttpClientModule),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    headerInterceptorProvider,
    timingInterceptorProvider,
    provideRouter(appRoutes),
  ]
})
  .catch(err => console.error(err));
