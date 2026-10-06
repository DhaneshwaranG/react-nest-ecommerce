import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service.js';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: { userId: number; items: { productId: number; quantity: number }[] }) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
}
