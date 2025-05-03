export class OrderItemDto {
  readonly productId: string;
  readonly quantity: number;
  readonly price: number;
}

export class CreateOrderDto {
  readonly userId: string;
  readonly items: OrderItemDto[];
  readonly shippingAddress: string;
  readonly paymentMethod: string;
  readonly totalAmount: number;
}

export class UpdateOrderDto {
  readonly status?:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  readonly paymentStatus?: 'pending' | 'paid' | 'failed';
  readonly shippingAddress?: string;
  readonly trackingNumber?: string;
}

export class OrderResponseDto {
  readonly id: string;
  readonly userId: string;
  readonly items: OrderItemDto[];
  readonly status:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  readonly paymentStatus: 'pending' | 'paid' | 'failed';
  readonly paymentMethod: string;
  readonly shippingAddress: string;
  readonly trackingNumber?: string;
  readonly totalAmount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
