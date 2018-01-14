/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { StoreTestModule } from '../../../test.module';
import { ProductCategoryDialogComponent } from '../../../../../../main/webapp/app/entities/product-category/product-category-dialog.component';
import { ProductCategoryService } from '../../../../../../main/webapp/app/entities/product-category/product-category.service';
import { ProductCategory } from '../../../../../../main/webapp/app/entities/product-category/product-category.model';

describe('Component Tests', () => {

    describe('ProductCategory Management Dialog Component', () => {
        let comp: ProductCategoryDialogComponent;
        let fixture: ComponentFixture<ProductCategoryDialogComponent>;
        let service: ProductCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [ProductCategoryDialogComponent],
                providers: [
                    ProductCategoryService
                ]
            })
            .overrideTemplate(ProductCategoryDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductCategoryDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCategoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductCategory(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.productCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProductCategory();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.productCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'productCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
