import { Component, ViewChild, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { MlBsModalDirective } from './ml-bs-modal.directive';
import { MlBsModal } from './ml-bs-modal.module';
import { By } from '@angular/platform-browser/';

@Component({
    selector: 'cnct-test',
    template: `
    <div
        cnctMlBsModal
        class="modal fade"
        (onShow)="onShow()"
        (onShown)="onShown()"
        (onHide)="onHide()"
        (onHidden)="onHidden()">
        <div class="modal-dialog cnct-modal">
            <div class="panel panel-default u-no-shadow l-mb-0">
                <div class="inner">modal text</div>
            </div>
        </div>
    </div>
  `
})
class TestComponent {
    @ViewChild(MlBsModalDirective) public modal: MlBsModalDirective;
    public onShow = jasmine.createSpy('onShow');
    public onShown = jasmine.createSpy('onShown');
    public onHide = jasmine.createSpy('onHide');
    public onHidden = jasmine.createSpy('onHidden');
    public showModal(): void {
        this.modal.show();
    }

    public hideModal(): void {
        this.modal.hide();
    }
}

describe('MlBsModalDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let comp: TestComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MlBsModal.forRoot()
            ],
            declarations: [
                TestComponent,
            ]
        });
        fixture = TestBed.createComponent(TestComponent);
        comp = fixture.componentInstance;
    });

    describe('onShow', () => {
        it('should emit when modal show', fakeAsync(() => {
            expect(comp.onShow).toHaveBeenCalledTimes(0);
            comp.showModal();
            tick(500);
            expect(comp.onShow).toHaveBeenCalledTimes(1);
        }));
    });

    describe('onShown', () => {
        it('should emit when modal show', fakeAsync(() => {
            expect(comp.onShown).toHaveBeenCalledTimes(0);
            comp.showModal();
            tick(500);
            expect(comp.onShown).toHaveBeenCalledTimes(1);
        }));
    });

    describe('onHide', () => {
        it('should emit when modal hide', fakeAsync(() => {
            comp.showModal();
            tick(500);
            expect(comp.onHide).toHaveBeenCalledTimes(0);
            comp.hideModal();
            tick(500);
            expect(comp.onHide).toHaveBeenCalledTimes(1);
        }));
    });

    describe('onHidden', () => {
        it('should emit when modal hide', fakeAsync(() => {
            comp.showModal();
            tick(500);
            expect(comp.onHidden).toHaveBeenCalledTimes(0);
            comp.hideModal();
            tick(500);
            expect(comp.onHidden).toHaveBeenCalledTimes(1);
        }));
    });

    describe('isShown', () => {
        it('should return modal status', fakeAsync(() => {
            expect(comp.modal.isShown).toEqual(false);
            comp.showModal();
            tick(500);
            expect(comp.modal.isShown).toEqual(true);
            comp.hideModal();
            tick(500);
            expect(comp.modal.isShown).toEqual(false);
        }));
    });

});
