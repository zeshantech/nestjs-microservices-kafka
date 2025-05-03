import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { AppService } from './app.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from './dto/product.dto';
import {
  CreateOrderDto,
  OrderResponseDto,
  UpdateOrderDto,
} from './dto/order.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Need to subscribe to reply topics
    this.userClient.subscribeToResponseOf('get.users');
    this.userClient.subscribeToResponseOf('get.user');
    this.userClient.subscribeToResponseOf('create.user');
    this.userClient.subscribeToResponseOf('update.user');
    this.userClient.subscribeToResponseOf('delete.user');

    this.productClient.subscribeToResponseOf('get.products');
    this.productClient.subscribeToResponseOf('get.product');
    this.productClient.subscribeToResponseOf('create.product');
    this.productClient.subscribeToResponseOf('update.product');
    this.productClient.subscribeToResponseOf('delete.product');
    this.productClient.subscribeToResponseOf('search.products');

    this.orderClient.subscribeToResponseOf('get.orders');
    this.orderClient.subscribeToResponseOf('get.order');
    this.orderClient.subscribeToResponseOf('create.order');
    this.orderClient.subscribeToResponseOf('update.order');
    this.orderClient.subscribeToResponseOf('delete.order');
    this.orderClient.subscribeToResponseOf('get.user.orders');

    await Promise.all([
      this.userClient.connect(),
      this.productClient.connect(),
      this.orderClient.connect(),
    ]);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // User APIs
  @Get('users')
  getUsers(): Observable<UserResponseDto[]> {
    return this.userClient.send('get.users', {});
  }

  @Get('users/:id')
  getUser(@Param('id') id: string): Observable<UserResponseDto> {
    return this.userClient.send('get.user', { id });
  }

  @Post('users')
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Observable<UserResponseDto> {
    return this.userClient.send('create.user', createUserDto);
  }

  @Put('users/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<UserResponseDto> {
    return this.userClient.send('update.user', { id, ...updateUserDto });
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string): Observable<any> {
    return this.userClient.send('delete.user', { id });
  }

  // Product APIs
  @Get('products')
  getProducts(): Observable<ProductResponseDto[]> {
    return this.productClient.send('get.products', {});
  }

  @Get('products/search')
  searchProducts(
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('name') name?: string,
  ): Observable<ProductResponseDto[]> {
    return this.productClient.send('search.products', {
      category,
      minPrice,
      maxPrice,
      name,
    });
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string): Observable<ProductResponseDto> {
    return this.productClient.send('get.product', { id });
  }

  @Post('products')
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Observable<ProductResponseDto> {
    return this.productClient.send('create.product', createProductDto);
  }

  @Put('products/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Observable<ProductResponseDto> {
    return this.productClient.send('update.product', {
      id,
      ...updateProductDto,
    });
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string): Observable<any> {
    return this.productClient.send('delete.product', { id });
  }

  // Order APIs
  @Get('orders')
  getOrders(): Observable<OrderResponseDto[]> {
    return this.orderClient.send('get.orders', {});
  }

  @Get('users/:userId/orders')
  getUserOrders(
    @Param('userId') userId: string,
  ): Observable<OrderResponseDto[]> {
    return this.orderClient.send('get.user.orders', { userId });
  }

  @Get('orders/:id')
  getOrder(@Param('id') id: string): Observable<OrderResponseDto> {
    return this.orderClient.send('get.order', { id });
  }

  @Post('orders')
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Observable<OrderResponseDto> {
    return this.orderClient.send('create.order', createOrderDto);
  }

  @Put('orders/:id')
  updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Observable<OrderResponseDto> {
    return this.orderClient.send('update.order', { id, ...updateOrderDto });
  }

  @Delete('orders/:id')
  deleteOrder(@Param('id') id: string): Observable<any> {
    return this.orderClient.send('delete.order', { id });
  }
}
