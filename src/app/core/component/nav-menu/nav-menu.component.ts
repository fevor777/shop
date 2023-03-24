import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCartProductsExisting, selectCartProductsTotalQuantity } from '../../@ngrx';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit {

  isEmptyCart$!: Observable<boolean>;
  totalQuantity$!: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isEmptyCart$ = this.store.select(selectCartProductsExisting);
    this.totalQuantity$ = this.store.select(selectCartProductsTotalQuantity);
  }

}
