/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { StoreTestModule } from '../../../test.module';
import { ProductCategoryComponent } from '../../../../../../main/webapp/app/entities/product-category/product-category.component';
import { ProductCategoryService } from '../../../../../../main/webapp/app/entities/product-category/product-category.service';
import { ProductCategory } from '../../../../../../main/webapp/app/entities/product-category/product-category.model';

describe('Component Tests', () => {

    describe('ProductCategory Management Component', () => {
        let comp: ProductCategoryComponent;
        let fixture: ComponentFixture<ProductCategoryComponent>;
        let service: ProductCategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [ProductCategoryComponent],
                providers: [
                    ProductCategoryService
                ]
            })
            .overrideTemplate(ProductCategoryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductCategoryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ProductCategory(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.productCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
