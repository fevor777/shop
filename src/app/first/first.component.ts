import { Component } from '@angular/core';

import { Category } from './category';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {
  name: string = 'first component name';
  description: string = 'first component description';
  price: number = 100;
  category: Category = Category.C1;
  isAvailable: boolean = true;
}
