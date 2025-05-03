import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { App3Module } from './app-3.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App3Module,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
          clientId: 'order-service',
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
  );
  await app.listen();
  console.log('Order Service is running as a microservice');
}
bootstrap();
