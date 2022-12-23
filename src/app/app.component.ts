import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
