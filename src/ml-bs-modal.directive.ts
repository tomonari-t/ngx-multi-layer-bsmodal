import { MlBsModalContainerComponent } from './ml-bs-modal-container.component';
import { MlBsModalService } from './ml-bs-modal.service';
import { isBs3 } from './isBs3';
import {
    Directive,
    ElementRef,
    Renderer,
    ComponentFactoryResolver,
    ComponentFactory,
    Output,
    EventEmitter,
    HostListener,
    OnDestroy,
} from '@angular/core';

/**
 * Attribute Directive provides modal bootstrap style
 *
 * ### Example
 *
 * ```
 * <div ngMlModal></div>
 * ```
 */


@Directive({
    selector: '[cnctMlBsModal]',
    exportAs: 'cnctMlBsModal'
})
export class MlBsModalDirective implements OnDestroy {
    @Output() public onShow: EventEmitter<MlBsModalDirective> = new EventEmitter();
    @Output() public onShown: EventEmitter<MlBsModalDirective> = new EventEmitter();
    @Output() public onHide: EventEmitter<MlBsModalDirective> = new EventEmitter();
    @Output() public onHidden: EventEmitter<MlBsModalDirective> = new EventEmitter();
    private _isShown: boolean = false;
    private isNested: boolean = false;
    private bgComponentFactory: ComponentFactory<MlBsModalContainerComponent>;
    private layerLevel: number;

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        if (event.target !== this.elementRef.nativeElement) {
            return;
        }
        this.hide(event);
    }

    @HostListener('window:keydown.esc')
    public onEsc(): void {
        if (this.layerLevel === this.modalService.getModalNum()) {
        this.hide();
        }
    }

    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer,
        private componentFactoryResolver: ComponentFactoryResolver,
        private modalService: MlBsModalService,
    ) {
        this.bgComponentFactory = this.componentFactoryResolver.resolveComponentFactory(MlBsModalContainerComponent);
    }

    public get isShown(): boolean {
        return this._isShown;
    }

    public toggle(): void {
        return this._isShown ? this.hide() : this.show();
    }

    public ngOnDestroy(): void {
        this.modalService.removeAllModalAndHide();
    }

    public show(): void {
        this.onShow.emit(this);

        if (this._isShown) {
            return;
        }
        this._isShown = true;
        this.isNested = this.modalService.hasModal();
        this.modalService.addModal(this, () => {
            this.showModal();
        });
    }

    private showModal(): void {
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'scrollTop', 0);
        this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-hidden', 'false');
        this.renderer.setElementStyle(this.elementRef.nativeElement, 'display', 'block');
        setTimeout(() => {
            this.renderer.setElementClass(this.elementRef.nativeElement, 'in', true);
            if (!isBs3()) {
                this.renderer.setElementClass(this.elementRef.nativeElement, 'show', true);
            }
            this.layerLevel = this.modalService.getModalNum();
            setTimeout(() => {
                this.onShown.emit(this);
            }, this.modalService.getTransitionTime());
        });
    }

    public hide(event ?: any): void {
        this.onHide.emit(this);

        if (!this._isShown) {
            return;
        }
        this._isShown = false;
        if (event) {
            event.preventDefault();
        }

        this.hideModal(() => {
            setTimeout(() => {
                this.modalService.removeModal(this);
            }, this.modalService.getTransitionTime())
        });
    }

    private hideModal(callback: Function): void {
        this.renderer.setElementClass(this.elementRef.nativeElement, 'in', false);
        this.renderer.setElementAttribute(this.elementRef.nativeElement, 'aria-hidden', 'true');
        if (!isBs3()) {
            this.renderer.setElementClass(this.elementRef.nativeElement, 'show', false);
        }

        setTimeout(() => {
            this.onHidden.emit(this);
            callback();
        }, this.modalService.getTransitionTime())
    }
}
