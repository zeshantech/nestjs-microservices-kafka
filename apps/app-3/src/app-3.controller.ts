import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { App3Service } from './app-3.service';
import {
  CreateOrderDto,
  OrderResponseDto,
  UpdateOrderDto,
} from './dto/order.dto';

@Controller()
export class App3Controller {
  constructor(private readonly app3Service: App3Service) {}

  @MessagePattern('get.orders')
  getOrders(): Promise<OrderResponseDto[]> {
    return this.app3Service.findAll();
  }

  @MessagePattern('get.order')
  getOrder(@Payload() data: { id: string }): Promise<OrderResponseDto> {
    return this.app3Service.findOne(data.id);
  }

  @MessagePattern('create.order')
  createOrder(
    @Payload() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return this.app3Service.create(createOrderDto);
  }

  @MessagePattern('update.order')
  updateOrder(
    @Payload() data: { id: string } & UpdateOrderDto,
  ): Promise<OrderResponseDto> {
    const { id, ...updateOrderDto } = data;
    return this.app3Service.update(id, updateOrderDto);
  }

  @MessagePattern('delete.order')
  deleteOrder(@Payload() data: { id: string }): Promise<{ success: boolean }> {
    return this.app3Service.remove(data.id);
  }

  @MessagePattern('get.user.orders')
  getUserOrders(
    @Payload() data: { userId: string },
  ): Promise<OrderResponseDto[]> {
    return this.app3Service.findByUserId(data.userId);
  }
}
