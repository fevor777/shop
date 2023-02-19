import { AfterViewInit, Component, DEFAULT_CURRENCY_CODE, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavMenuComponent } from './core/component/nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    NavMenuComponent,
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
