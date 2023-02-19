import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { EditProductComponent } from './edit-product/edit-product.component';

@Injectable({
    providedIn: 'root'
  })
  export class CanEditProductDeactivateGuard implements CanDeactivate<EditProductComponent> {

    canDeactivate(component: EditProductComponent):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
        const canDeactivate = component.canDeactivate();
        if (!canDeactivate) {
          alert('You have not saved this product');
        }
      return canDeactivate;
    }
  }