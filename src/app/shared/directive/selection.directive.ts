import { Attribute, Directive, ElementRef, Input, type OnInit, Renderer2, HostListener } from "@angular/core";

@Directive({
    selector: '[selectionDirective]',
    standalone: true
})
export class SelectionDirective implements OnInit {

    @Input('selectionDirective') enabled: boolean = true;
    @Input('backgroundColor') backgroundColor: string = 'red';
    @Input('shadowColor') shadowColor: string = 'yellow';

    private defaultBackgroundColor?: string;
    private defaultBoxShadow?: string;
    
    constructor(
        private el: ElementRef,
        private render: Renderer2,
        @Attribute('testAttr') private testAttr: string
    ) {}

    ngOnInit(): void {
        this.defaultBackgroundColor = this.el.nativeElement.style.backgroundColor;
        this.defaultBoxShadow = this.el.nativeElement.style.boxShadow;
        console.log('testAttr: ', this.testAttr);
        console.log(this.el.nativeElement.getAttributeNames());
    }

    @HostListener('click')
    onClick(): void {
        if (this.enabled) {
            this.changeStyle();
        }
    }
    
    private changeStyle(): void {
        let background = this.defaultBackgroundColor;
        if (this.el.nativeElement.style.backgroundColor === this.defaultBackgroundColor) {
            background = this.backgroundColor;
        }
        let shadow = this.defaultBoxShadow;
        if (this.el.nativeElement.style.boxShadow === this.defaultBoxShadow) {
            shadow = `10px 10px ${this.shadowColor}`;
        }
        this.render.setStyle(this.el.nativeElement, 'backgroundColor', background);
        this.render.setStyle(this.el.nativeElement, 'boxShadow', shadow);
    }


}