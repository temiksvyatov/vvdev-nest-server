import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // get all products
  @Get()
  getProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    links: any;
  }> {
    return this.productsService.findAll(page, limit);
  }

  // get product by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    } else {
      return product;
    }
  }

  // create product
  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  // update product
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() product: Product,
  ): Promise<any> {
    return this.productsService.update(id, product);
  }

  // delete product
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    // handle error if product does not exist
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return this.productsService.delete(id);
  }
}
