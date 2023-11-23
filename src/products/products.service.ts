import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
//import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
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
