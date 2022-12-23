import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { CartListComponent } from './cart/component/cart-list/cart-list.component';
import { FirstComponent } from './first/first.component';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    ProductModule,
    OrderModule,
    FirstComponent,
    CartListComponent
  ],
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
