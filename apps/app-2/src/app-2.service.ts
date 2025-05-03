import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class App2Service {
  private readonly products: Map<string, ProductResponseDto> = new Map();

  // For demo purposes, create some mock products
  constructor() {
    // Add some mock data
    const product1 = this.createMockProduct(
      'Smartphone',
      'High-end smartphone with great camera',
      999.99,
      'Electronics',
    );
    const product2 = this.createMockProduct(
      'Laptop',
      'Powerful laptop for professionals',
      1499.99,
      'Electronics',
    );
    const product3 = this.createMockProduct(
      'Running Shoes',
      'Comfortable shoes for runners',
      129.99,
      'Sports',
    );
    this.products.set(product1.id, product1);
    this.products.set(product2.id, product2);
    this.products.set(product3.id, product3);
  }

  private createMockProduct(
    name: string,
    description: string,
    price: number,
    category: string,
  ): ProductResponseDto {
    const now = new Date();
    return {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      stock: Math.floor(Math.random() * 100) + 10,
      isAvailable: true,
      createdAt: now,
      updatedAt: now,
    };
  }

  async findAll(): Promise<ProductResponseDto[]> {
    return Array.from(this.products.values());
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const id = uuidv4();
    const now = new Date();

    const newProduct: ProductResponseDto = {
      id,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      category: createProductDto.category,
      stock: createProductDto.stock,
      imageUrl: createProductDto.imageUrl,
      isAvailable: createProductDto.isAvailable ?? true,
      createdAt: now,
      updatedAt: now,
    };

    this.products.set(id, newProduct);
    return newProduct;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const existingProduct = await this.findOne(id);

    const updatedProduct: ProductResponseDto = {
      ...existingProduct,
      ...updateProductDto,
      updatedAt: new Date(),
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const exists = this.products.has(id);
    if (!exists) {
      throw new Error(`Product with ID ${id} not found`);
    }

    this.products.delete(id);
    return { success: true };
  }

  async search(params: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    name?: string;
  }): Promise<ProductResponseDto[]> {
    const allProducts = await this.findAll();

    return allProducts.filter((product) => {
      let matches = true;

      if (params.category && product.category !== params.category) {
        matches = false;
      }

      if (params.minPrice && product.price < params.minPrice) {
        matches = false;
      }

      if (params.maxPrice && product.price > params.maxPrice) {
        matches = false;
      }

      if (
        params.name &&
        !product.name.toLowerCase().includes(params.name.toLowerCase())
      ) {
        matches = false;
      }

      return matches;
    });
  }
}
