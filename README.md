<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# NestJS Microservices Architecture with Kafka

This project demonstrates a microservices architecture using NestJS and Apache Kafka as a message broker. It consists of 4 applications:

1. **API Gateway (nest-app)**: The entry point for clients that forwards requests to appropriate microservices.
2. **User Service (app-1)**: Handles user-related operations.
3. **Product Service (app-2)**: Handles product-related operations.
4. **Order Service (app-3)**: Handles order-related operations.

## Architecture Overview

- **Communication Pattern**: Message-based communication using Kafka
- **API Gateway Pattern**: Single entry point for all clients
- **Domain-Driven Design**: Services separated by business domain
- **Apache Kafka**: Official Confluent images for Kafka and Zookeeper

## Prerequisites

- Node.js (v16+)
- Yarn or npm
- Docker and Docker Compose (for Kafka)

## Getting Started

1. **Start Kafka and Zookeeper**:

```bash
npm run kafka:up
```

For more details on working with Kafka, see [KAFKA.md](KAFKA.md).

2. **Install dependencies**:

```bash
yarn install
```

3. **Start all services**:

```bash
yarn start:all
```

Or start services individually:

```bash
# Start API Gateway
yarn start:dev

# Start User Service
yarn start:dev:app1

# Start Product Service
yarn start:dev:app2

# Start Order Service
yarn start:dev:app3
```

## API Endpoints

### User Service

- `GET /users` - Get all users
- `GET /users/:id` - Get a specific user
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Product Service

- `GET /products` - Get all products
- `GET /products/:id` - Get a specific product
- `GET /products/search` - Search products with filters
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Order Service

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get a specific order
- `GET /users/:userId/orders` - Get all orders for a user
- `POST /orders` - Create a new order
- `PUT /orders/:id` - Update an order
- `DELETE /orders/:id` - Delete an order

## Architecture Principles

This project follows these microservices principles:

1. **Single Responsibility**: Each service handles a specific business capability
2. **Autonomy**: Services can be developed, deployed, and scaled independently
3. **Resilience**: Failures in one service don't cascade to others
4. **Asynchronous Communication**: Using Kafka for service-to-service communication
5. **API Gateway**: Simplified client experience with a single entry point

## Monitoring

Access the Kafka UI at http://localhost:8080 to monitor Kafka topics and messages.

## Implementation Details

- **Transport Layer**: Kafka
- **Message Patterns**: Request-Response via message patterns
- **Data Storage**: In-memory storage (for demo purposes)
- **Error Handling**: Centralized error handling at API Gateway

## Further Improvements

- Add authentication and authorization
- Implement database persistence
- Add service discovery
- Add distributed tracing
- Implement circuit breakers
- Add caching
- Implement health checks
