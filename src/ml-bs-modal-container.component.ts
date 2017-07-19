import { isBs3 } from './isBs3';
import {
    Component,
    ViewChild,
    ElementRef,
    Renderer,
    HostBinding
 } from '@angular/core';


@Component({
    selector: 'cnct-ml-bs-modal-container',
    styleUrls: ['./ml-bs-modal.style.scss'],
    template: `
        <div #bg class="ml-bs-modal-bg fade"></div>
    `
})
export class MlBsModalContainerComponent {
    @ViewChild('bg') public bg: ElementRef;
    @HostBinding('style.position') private position = 'relative';
    @HostBinding('style.zIndex') private zIndex = '1050';
    @HostBinding('style.display') private display = 'none';
    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer
    ) { }

    public showBg(): void {
        this.renderer.setElementClass(this.bg.nativeElement, 'in', true);
        if (!isBs3()) {
            this.renderer.setElementClass(this.bg.nativeElement, 'show', true);
        }
    }

    public hideBg(): void {
        this.renderer.setElementClass(this.bg.nativeElement, 'in', false);
        if (!isBs3()) {
            this.renderer.setElementClass(this.bg.nativeElement, 'show', false);
        }
    }

    public hideContainer(): void {
        this.renderer.setElementClass(document.body, 'modal-open', false);
        this.display = 'none'
    }

    public showContainer(): void {
        this.renderer.setElementClass(document.body, 'modal-open', true);
        this.display = 'block';
    }
}
