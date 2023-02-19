import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { ProductModel } from '../../../shared/model/product.model';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  productObs?: Observable<ProductModel>;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.productObs = this.activatedRoute.data.pipe(map(data => data['product'] as ProductModel));
  }

}
