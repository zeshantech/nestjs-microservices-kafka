import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { App2Service } from './app-2.service';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from './dto/product.dto';

@Controller()
export class App2Controller {
  constructor(private readonly app2Service: App2Service) {}

  @MessagePattern('get.products')
  getProducts(): Promise<ProductResponseDto[]> {
    return this.app2Service.findAll();
  }

  @MessagePattern('get.product')
  getProduct(@Payload() data: { id: string }): Promise<ProductResponseDto> {
    return this.app2Service.findOne(data.id);
  }

  @MessagePattern('create.product')
  createProduct(
    @Payload() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return this.app2Service.create(createProductDto);
  }

  @MessagePattern('update.product')
  updateProduct(
    @Payload() data: { id: string } & UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const { id, ...updateProductDto } = data;
    return this.app2Service.update(id, updateProductDto);
  }

  @MessagePattern('delete.product')
  deleteProduct(
    @Payload() data: { id: string },
  ): Promise<{ success: boolean }> {
    return this.app2Service.remove(data.id);
  }

  @MessagePattern('search.products')
  searchProducts(
    @Payload()
    data: {
      category?: string;
      minPrice?: number;
      maxPrice?: number;
      name?: string;
    },
  ): Promise<ProductResponseDto[]> {
    return this.app2Service.search(data);
  }
}
