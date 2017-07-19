import { MlBsModalContainerComponent } from './ml-bs-modal-container.component';
import { MlBsModalDirective } from './ml-bs-modal.directive';
import {
    Injectable,
    ComponentRef,
    ComponentFactoryResolver,
    ComponentFactory,
    Injector,
    ApplicationRef,
    ElementRef
} from '@angular/core';

const TRANSITION_TIME: number = 150;

@Injectable()
export class MlBsModalService {
    private modalNum: number = 0;
    private containerComponentFactory: ComponentFactory<MlBsModalContainerComponent>
    private containerComponentRef: ComponentRef<MlBsModalContainerComponent>;
    private containerComponent: MlBsModalContainerComponent;
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private injector: Injector,
        private appRef: ApplicationRef,
    ) {
        this.containerComponentFactory = this.componentFactoryResolver.resolveComponentFactory(MlBsModalContainerComponent);
        this.containerComponentRef = this.containerComponentFactory.create(this.injector);
        this.containerComponent = this.containerComponentRef.instance;
        this.appRef.attachView(this.containerComponentRef.hostView);
        document.querySelector('body').appendChild(this.containerComponentRef.location.nativeElement);
    }

    public getTransitionTime(): number {
        return TRANSITION_TIME;
    }

    public getContainerComponentRef(): ComponentRef<MlBsModalContainerComponent> {
        return this.containerComponentRef;
    }

    public addModal(modal: MlBsModalDirective, callback: Function): void {
        if (!this.hasModal()) {
            this.containerComponent.showContainer();
        }
        this.addModalElement(modal.elementRef);
        setTimeout(() => {
            this.containerComponent.showBg();
            callback();
        });
    }

    public removeModal(modal: MlBsModalDirective): void {
        this.removeModalElement(modal.elementRef);
        if (!this.hasModal()) {
            this.containerComponent.hideBg();
            setTimeout(() => {
                this.containerComponent.hideContainer();
            }, TRANSITION_TIME);
        }
    }

    private addModalElement(elementRef: ElementRef): void {
        this.containerComponentRef.instance.elementRef.nativeElement.appendChild(this.containerComponentRef.instance.bg.nativeElement);
        this.containerComponentRef.instance.elementRef.nativeElement.appendChild(elementRef.nativeElement);
        this.modalNum += 1;
    }

    private removeModalElement(elementRef: ElementRef): void {
        this.containerComponentRef.location.nativeElement.removeChild(elementRef.nativeElement);
        this.modalNum -= 1;
        if (this.hasModal()) {
            const modal = this.containerComponentRef.location.nativeElement.querySelectorAll('.modal');
            this.containerComponentRef.instance.elementRef.nativeElement.appendChild(modal[modal.length - 1]);
        }
    }

    public removeAllModalAndHide(): void {
        const modal = this.containerComponentRef.location.nativeElement.querySelectorAll('.modal');
        modal.forEach((elem) => {
            this.containerComponentRef.location.nativeElement.removeChild(elem);
        });
        this.modalNum = 0;
        this.containerComponent.hideBg();
        this.containerComponent.hideContainer();
    }

    public hasModal(): boolean {
        if (this.modalNum === 0) {
            return false;
        } else {
            return true;
        }
    }

    public getModalNum(): number {
        return this.modalNum;
    }
}
