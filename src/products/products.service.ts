import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  createPaginationLinks(page: number, limit: number, total: number) {
    const totalPages = Math.ceil(total / limit);
    return {
      first: `/products?page=1&limit=${limit}`,
      prev: page > 1 ? `/products?page=${page - 1}&limit=${limit}` : null,
      next:
        page < totalPages ? `/products?page=${page + 1}&limit=${limit}` : null,
      last: `/products?page=${totalPages}&limit=${limit}`,
    };
  }

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
    links: any;
  }> {
    const [data, total] = await this.productRepository.findAndCount({
      skip: page > 0 ? (page - 1) * limit : 0,
      take: limit,
    });
    const paginationLinks = this.createPaginationLinks(page, limit, total);
    return {
      data,
      total,
      page,
      limit,
      links: paginationLinks,
    };
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(product: Partial<Product>): Promise<Product> {
    const newproduct = this.productRepository.create(product);
    return this.productRepository.save(newproduct);
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
