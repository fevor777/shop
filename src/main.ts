import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import appRoutes from './app/app-routes';
import { AppComponent } from './app/app.component';
import { CartProductsEffects, cartProductsFeatureKey, cartProductsReducer, CustomSerializer, RouterEffects, routerReducers } from './app/core/@ngrx';
import { metaReducers } from './app/core/@ngrx/meta-reducers';
import { carInitializerProvider } from './app/core/guard/cart.initializer';
import { headerInterceptorProvider } from './app/core/interceptor/header.interceptor';
import { timingInterceptorProvider } from './app/core/interceptor/timing.interceptor';
import { environment } from './environment';

bootstrapApplication(AppComponent, {
  providers: [
    carInitializerProvider,
    importProvidersFrom(
      HttpClientModule,
      StoreModule.forRoot(
        routerReducers,
        {
          metaReducers,
          // All checks will automatically be disabled in production builds
          runtimeChecks: {
            strictStateImmutability: true, // default value is true
            strictActionImmutability: true, // default value is true
            strictStateSerializability: true, // default value is false
            strictActionSerializability: true, // default value is false
            strictActionWithinNgZone: true, // default value is false
            strictActionTypeUniqueness: false, // default value is false
          },
        }
      ),
      StoreRouterConnectingModule.forRoot({
        stateKey: 'router',
        routerState: RouterState.Minimal,
        serializer: CustomSerializer
        }),
      !environment.production
        ? StoreDevtoolsModule.instrument({
            maxAge: 25,
            autoPause: true,
          })
        : [],
      EffectsModule.forRoot([RouterEffects, CartProductsEffects]),
      StoreModule.forFeature(cartProductsFeatureKey, cartProductsReducer),
    ),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    headerInterceptorProvider,
    timingInterceptorProvider,
    provideRouter(appRoutes),
  ],
}).catch((err) => console.error(err));
