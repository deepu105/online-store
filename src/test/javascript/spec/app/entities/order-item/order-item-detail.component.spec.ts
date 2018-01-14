/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { StoreTestModule } from '../../../test.module';
import { OrderItemDetailComponent } from '../../../../../../main/webapp/app/entities/order-item/order-item-detail.component';
import { OrderItemService } from '../../../../../../main/webapp/app/entities/order-item/order-item.service';
import { OrderItem } from '../../../../../../main/webapp/app/entities/order-item/order-item.model';

describe('Component Tests', () => {

    describe('OrderItem Management Detail Component', () => {
        let comp: OrderItemDetailComponent;
        let fixture: ComponentFixture<OrderItemDetailComponent>;
        let service: OrderItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StoreTestModule],
                declarations: [OrderItemDetailComponent],
                providers: [
                    OrderItemService
                ]
            })
            .overrideTemplate(OrderItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrderItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new OrderItem(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.orderItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
