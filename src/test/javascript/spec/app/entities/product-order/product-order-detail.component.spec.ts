/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { StoreTestModule } from '../../../test.module';
import { ProductOrderDetailComponent } from '../../../../../../main/webapp/app/entities/product-order/product-order-detail.component';
import { ProductOrderService } from '../../../../../../main/webapp/app/entities/product-order/product-order.service';
import { ProductOrder } from '../../../../../../main/webapp/app/entities/product-order/product-order.model';

describe('Component Tests', () => {

    describe('ProductOrder Management Detail Component', () => {
        let comp: ProductOrderDetailComponent;
        let fixture: ComponentFixture<ProductOrderDetailComponent>;
        let service: ProductOrderService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [ProductOrderDetailComponent],
                providers: [
                    ProductOrderService
                ]
            })
            .overrideTemplate(ProductOrderDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProductOrderDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductOrderService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ProductOrder(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.productOrder).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
