import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectSelectedProductByUrl } from '../../../core/@ngrx/data/entity-store';
import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product$?: Observable<ProductModel>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.product$ = this.store.select(selectSelectedProductByUrl);
  }

}
