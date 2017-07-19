import { NgModule, ModuleWithProviders } from '@angular/core';
import { MlBsModalDirective } from './ml-bs-modal.directive';
import { MlBsModalContainerComponent } from './ml-bs-modal-container.component';
import { MlBsModalService } from './ml-bs-modal.service';

@NgModule({
    declarations: [
        MlBsModalDirective,
        MlBsModalContainerComponent
    ],
    exports: [
        MlBsModalDirective
    ],
    entryComponents: [
        MlBsModalContainerComponent
    ]
})
export class MlBsModal {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: MlBsModal,
            providers: [MlBsModalService]
        }
    }
}
