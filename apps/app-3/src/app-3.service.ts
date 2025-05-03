import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateOrderDto,
  OrderItemDto,
  OrderResponseDto,
  UpdateOrderDto,
} from './dto/order.dto';

@Injectable()
export class App3Service {
  private readonly orders: Map<string, OrderResponseDto> = new Map();

  // For demo purposes, create some mock orders
  constructor() {
    // Add some mock data
    const order1 = this.createMockOrder('user1', [
      { productId: 'product1', quantity: 2, price: 999.99 },
      { productId: 'product3', quantity: 1, price: 129.99 },
    ]);
    const order2 = this.createMockOrder('user2', [
      { productId: 'product2', quantity: 1, price: 1499.99 },
    ]);
    const order3 = this.createMockOrder('user1', [
      { productId: 'product3', quantity: 3, price: 129.99 },
    ]);
    this.orders.set(order1.id, order1);
    this.orders.set(order2.id, order2);
    this.orders.set(order3.id, order3);
  }

  private createMockOrder(
    userId: string,
    items: OrderItemDto[],
  ): OrderResponseDto {
    const now = new Date();
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      id: uuidv4(),
      userId,
      items,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'credit_card',
      shippingAddress: '123 Example St, City, Country',
      totalAmount,
      createdAt: now,
      updatedAt: now,
    };
  }

  async findAll(): Promise<OrderResponseDto[]> {
    return Array.from(this.orders.values());
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    const order = this.orders.get(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const id = uuidv4();
    const now = new Date();

    const newOrder: OrderResponseDto = {
      id,
      userId: createOrderDto.userId,
      items: createOrderDto.items,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: createOrderDto.paymentMethod,
      shippingAddress: createOrderDto.shippingAddress,
      totalAmount: createOrderDto.totalAmount,
      createdAt: now,
      updatedAt: now,
    };

    this.orders.set(id, newOrder);
    return newOrder;
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderResponseDto> {
    const existingOrder = await this.findOne(id);

    const updatedOrder: OrderResponseDto = {
      ...existingOrder,
      ...updateOrderDto,
      updatedAt: new Date(),
    };

    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const exists = this.orders.has(id);
    if (!exists) {
      throw new Error(`Order with ID ${id} not found`);
    }

    this.orders.delete(id);
    return { success: true };
  }

  async findByUserId(userId: string): Promise<OrderResponseDto[]> {
    const allOrders = await this.findAll();
    return allOrders.filter((order) => order.userId === userId);
  }
}
