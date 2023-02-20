import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

@Injectable({
    providedIn: 'root'
  })
  export class CanEditProductDeactivateGuard implements CanDeactivate<AddEditProductComponent> {

    canDeactivate(component: AddEditProductComponent):
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