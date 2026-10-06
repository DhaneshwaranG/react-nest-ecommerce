import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(data: { userId: number; items: { productId: number; quantity: number }[] }) {
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      }
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { user: true, items: { include: { product: true } } }
    });
  }

  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true } } }
    });
  }
}
