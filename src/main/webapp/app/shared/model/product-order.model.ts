import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model/order-item.model';
import { IInvoice } from 'app/shared/model/invoice.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IProductOrder {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  code?: string;
  orderItems?: IOrderItem[];
  invoices?: IInvoice[];
  customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: Moment,
    public status?: OrderStatus,
    public code?: string,
    public orderItems?: IOrderItem[],
    public invoices?: IInvoice[],
    public customer?: ICustomer
  ) {}
}
