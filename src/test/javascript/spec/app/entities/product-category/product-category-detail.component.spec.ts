/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { StoreTestModule } from '../../../test.module';
import { ProductCategoryDetailComponent } from '../../../../../../main/webapp/app/entities/product-category/product-category-detail.component';
import { ProductCategoryService } from '../../../../../../main/webapp/app/entities/product-category/product-category.service';
import { ProductCategory } from '../../../../../../main/webapp/app/entities/product-category/product-category.model';

describe('Component Tests', () => {

    describe('ProductCategory Management Detail Component', () => {
        let comp: ProductCategoryDetailComponent;
        let fixture: ComponentFixture<ProductCategoryDetailComponent>;
        let service: ProductCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [ProductCategoryDetailComponent],
                providers: [
                    ProductCategoryService
                ]
            })
            .overrideTemplate(ProductCategoryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductCategoryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProductCategory(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
