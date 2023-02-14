import { AfterViewInit, Component, DEFAULT_CURRENCY_CODE, ElementRef, ViewChild } from '@angular/core';

import { CartListComponent } from './cart/component/cart-list/cart-list.component';
import { FirstComponent } from './first/first.component';
import { OrderModule } from './order/order.module';
import { ProductListComponent } from './product/component/product-list/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    ProductListComponent,
    OrderModule,
    FirstComponent,
    CartListComponent,
  ],
  providers: [
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }
  ]
})
export class AppComponent implements AfterViewInit {

  title = 'shop';

  @ViewChild('appTitle') appTitleView!: ElementRef<HTMLHeadingElement>;

  ngAfterViewInit(): void {
    if (this.appTitleView) {
      this.appTitleView.nativeElement.innerText = this.title;
    }
  }
  
}
