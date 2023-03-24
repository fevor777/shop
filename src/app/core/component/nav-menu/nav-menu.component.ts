import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { CartProductsFacade } from '../../@ngrx';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit {

  isNotEmptyCart$!: Observable<boolean>;
  totalQuantity$!: Observable<number>;

  constructor(private cartProductsFacade: CartProductsFacade) {}

  ngOnInit(): void {
    this.isNotEmptyCart$ = this.cartProductsFacade.cartProductsExisting$;
    this.totalQuantity$ = this.cartProductsFacade.cartProductsTotalQuantity$;
  }

}
