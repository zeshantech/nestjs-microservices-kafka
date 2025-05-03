import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { App1Module } from './app-1.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    App1Module,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
          clientId: 'user-service',
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
  );
  await app.listen();
  console.log('User Service is running as a microservice');
}
bootstrap();
