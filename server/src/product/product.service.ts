import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.product.create({ data });
  }

  async findAll(page: number = 1, limit: number = 10, sort?: string, search?: string) {
    const skip = (page - 1) * limit;

    let orderBy: any = { createdAt: 'desc' };
    if (sort) {
      const [field, order] = sort.split(':');
      if (field && (order === 'asc' || order === 'desc')) {
        orderBy = { [field]: order };
      } else {
        orderBy = { [sort]: 'asc' };
      }
    }

    let where: any = {};
    if (search) {
      where = {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy,
        where,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getFeatured() {
    return this.prisma.product.findMany({
      where: { isFeatured: true } as any,
      take: 10,
    });
  }

  async getLatest() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }
}
