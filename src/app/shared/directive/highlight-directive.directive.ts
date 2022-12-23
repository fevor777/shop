import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightDirective]'
})
export class HighlightDirectiveDirective {

  private readonly defaultBackground: string = 'white';

  @HostBinding('style.background') background: string = this.defaultBackground;

  @HostListener('mouseenter')
  enter(): void {
    this.background = 'yellow';
  }

  @HostListener('mouseleave')
  leave(): void {
    this.background = this.defaultBackground;
  }

}
