export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly stock: number;
  readonly imageUrl?: string;
  readonly isAvailable?: boolean;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly category?: string;
  readonly stock?: number;
  readonly imageUrl?: string;
  readonly isAvailable?: boolean;
}

export class ProductResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly stock: number;
  readonly imageUrl?: string;
  readonly isAvailable: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
