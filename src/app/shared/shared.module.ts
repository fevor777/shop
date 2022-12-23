import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirectiveDirective } from './directive/highlight-directive.directive';

@NgModule({
  declarations: [
    HighlightDirectiveDirective
  ],
  exports: [
    HighlightDirectiveDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
