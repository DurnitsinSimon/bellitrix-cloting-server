import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { Payment } from '@a2seven/yoo-checkout';

import { Order } from './order.model';

import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async createPayment(@Query('sumPaid') sumPaid: number): Promise<Payment> {
    return this.orderService.createPayment(sumPaid);
  }

  @Get('getPaymentInfo')
  async getPaymentInfo(@Query('id') id: string): Promise<Payment> {
    return this.orderService.getPaymentInfo(id);
  }

  @Get('capturePayment')
  async capturePayment(
    @Query('paymentId') paymentId: string,
    @Query('sumPaid') sumPaid: number,
  ): Promise<Payment> {
    return this.orderService.capturePayment(paymentId, sumPaid);
  }

  @Post('createOrder')
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(dto);
  }

  @Get('findAllOrders')
  async findAllOrders(): Promise<Order[]> {
    return this.orderService.findAllOrders();
  }

  @Get('findOrderById')
  async findOrderById(@Query('id') id: string): Promise<Order> {
    return this.orderService.findOrderById(id);
  }
}
