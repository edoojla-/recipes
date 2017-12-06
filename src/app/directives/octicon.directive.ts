import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

import * as octicons from 'octicons';

/**
 * See solution suggested from https://github.com/robisim74 in https://github.com/primer/octicons/issues/162
 */
@Directive({
    selector: '[octicon]'
})
export class OcticonDirective implements OnInit {

    @Input() octicon: string;
    @Input() color: string;
    @Input() width: number;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnInit(): void {
        const el = HTMLElement = this.elementRef.nativeElement;
        el.innerHTML = octicons[this.octicon].toSVG();

        const icon: HTMLElement = el.firstChild;
        if (this.color) {
            this.renderer.setStyle(icon, 'color', this.color)
        }
        if (this.width) {
            this.renderer.setStyle(icon, 'width', this.width);
            this.renderer.setStyle(icon, 'height', '100%');
        }
    }

}
