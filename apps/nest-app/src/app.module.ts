import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-client',
            brokers: ['localhost:9092'],
            retry: {
              initialRetryTime: 300,
              retries: 5,
            },
          },
          consumer: {
            groupId: 'user-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'product-client',
            brokers: ['localhost:9092'],
            retry: {
              initialRetryTime: 300,
              retries: 5,
            },
          },
          consumer: {
            groupId: 'product-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'order-client',
            brokers: ['localhost:9092'],
            retry: {
              initialRetryTime: 300,
              retries: 5,
            },
          },
          consumer: {
            groupId: 'order-consumer',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
