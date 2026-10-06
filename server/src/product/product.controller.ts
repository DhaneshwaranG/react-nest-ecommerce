import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: any) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
  ) {
    return this.productService.findAll(
      page ? +page : undefined,
      limit ? +limit : undefined,
      sort,
      search,
    );
  }

  @Get('featured')
  getFeatured() {
    return this.productService.getFeatured();
  }

  @Get('latest')
  getLatest() {
    return this.productService.getLatest();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
