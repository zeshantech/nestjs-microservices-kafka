import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { App2Module } from './app-2.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App2Module,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
          clientId: 'product-service',
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
  );
  await app.listen();
  console.log('Product Service is running as a microservice');
}
bootstrap();
