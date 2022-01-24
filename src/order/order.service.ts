import { BadRequestException, Injectable } from '@nestjs/common';
import {
  YooCheckout,
  ICreatePayment,
  ICapturePayment,
  Payment,
} from '@a2seven/yoo-checkout';
import { Order, OrderDocument } from './order.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

const checkout = new YooCheckout({
  shopId: '871100',
  secretKey: 'test_j9Y_FAXjGacvdqpHAiyHqmk3ysRrMutYPkWbnKFFzUw',
});

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}
  private makeid(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async createPayment(sumPaid: number): Promise<Payment> {
    const idempotenceKey =
      '02347fc4-' +
      this.makeid(4) +
      '-' +
      this.makeid(4) +
      '-' +
      this.makeid(4) +
      '-' +
      this.makeid(12);
    const numberOfOrder = await (await this.orderModel.find()).length;
    const createPayload: ICreatePayment = {
      amount: {
        value: sumPaid + '.00',
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      description: `Заказ N*${numberOfOrder} После успешной оплаты вернитесь в магазин для подтверждения, в противном случае заказ не будет создан`,
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3000/successPayment',
      },
    };

    try {
      const payment = await checkout.createPayment(
        createPayload,
        idempotenceKey,
      );
      console.log(payment);

      return payment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPaymentInfo(paymentId: string): Promise<Payment> {
    try {
      const payment = await checkout.getPayment(paymentId);
      return payment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async capturePayment(paymentId: string, sumPaid: number): Promise<Payment> {
    const idempotenceKey =
      '02347fc4-' +
      this.makeid(4) +
      '-' +
      this.makeid(4) +
      '-' +
      this.makeid(4) +
      '-' +
      this.makeid(12);

    const capturePayload: ICapturePayment = {
      amount: {
        value: `${sumPaid}.00`,
        currency: 'RUB',
      },
    };
    try {
      const payment = await checkout.capturePayment(
        paymentId,
        capturePayload,
        idempotenceKey,
      );
      return payment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const date = new Date();
    return this.orderModel.create({...dto, date: date.toDateString()});
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findOrderById(id: string): Promise<Order> {
    return this.orderModel.findById(id);
  }
}
