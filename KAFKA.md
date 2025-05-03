# Working with Apache Kafka in the Microservices Architecture

This project uses Apache Kafka (via the Confluent distribution) as a message broker for communication between microservices. This document provides information on how to work with and troubleshoot the Kafka setup.

## Kafka Setup

The Kafka setup consists of:

- **Zookeeper** - Manages Kafka cluster state
- **Kafka Broker** - Message broker that handles message publishing and consumption
- **Kafka UI** - Web interface for monitoring and managing Kafka

## Starting and Managing Kafka

The following npm/yarn scripts are available for working with Kafka:

```bash
# Start Kafka and Zookeeper containers
npm run kafka:up

# Stop Kafka and Zookeeper containers
npm run kafka:down

# View logs from Kafka and Zookeeper
npm run kafka:logs

# Restart Kafka and Zookeeper
npm run kafka:restart

# Reset Kafka (delete all data and recreate containers)
npm run kafka:reset
```

## Monitoring Kafka

### Kafka UI

A Kafka UI is available at [http://localhost:8080](http://localhost:8080), which provides:

- Topic creation and management
- Message browsing
- Consumer group monitoring
- Performance metrics

### Command Line Tools

You can also interact with Kafka using the command-line tools inside the Kafka container:

```bash
# List topics
docker exec kafka kafka-topics --bootstrap-server kafka:9092 --list

# Create a topic
docker exec kafka kafka-topics --bootstrap-server kafka:9092 --create --topic my-topic --partitions 1 --replication-factor 1

# Describe a topic
docker exec kafka kafka-topics --bootstrap-server kafka:9092 --describe --topic my-topic

# Produce messages to a topic
docker exec -it kafka kafka-console-producer --bootstrap-server kafka:9092 --topic my-topic

# Consume messages from a topic
docker exec -it kafka kafka-console-consumer --bootstrap-server kafka:9092 --topic my-topic --from-beginning
```

## Topics Used in This Architecture

The following Kafka topics are automatically created and used in this architecture:

| Topic             | Description                                    | Used By                      |
| ----------------- | ---------------------------------------------- | ---------------------------- |
| `get.users`       | Request/response for fetching all users        | API Gateway, User Service    |
| `get.user`        | Request/response for fetching a single user    | API Gateway, User Service    |
| `create.user`     | Request/response for creating a user           | API Gateway, User Service    |
| `update.user`     | Request/response for updating a user           | API Gateway, User Service    |
| `delete.user`     | Request/response for deleting a user           | API Gateway, User Service    |
| `get.products`    | Request/response for fetching all products     | API Gateway, Product Service |
| `get.product`     | Request/response for fetching a single product | API Gateway, Product Service |
| `create.product`  | Request/response for creating a product        | API Gateway, Product Service |
| `update.product`  | Request/response for updating a product        | API Gateway, Product Service |
| `delete.product`  | Request/response for deleting a product        | API Gateway, Product Service |
| `search.products` | Request/response for searching products        | API Gateway, Product Service |
| `get.orders`      | Request/response for fetching all orders       | API Gateway, Order Service   |
| `get.order`       | Request/response for fetching a single order   | API Gateway, Order Service   |
| `create.order`    | Request/response for creating an order         | API Gateway, Order Service   |
| `update.order`    | Request/response for updating an order         | API Gateway, Order Service   |
| `delete.order`    | Request/response for deleting an order         | API Gateway, Order Service   |
| `get.user.orders` | Request/response for fetching orders by user   | API Gateway, Order Service   |

## Common Issues and Solutions

### Services Cannot Connect to Kafka

If your services cannot connect to Kafka, check:

1. Kafka container is running:

   ```bash
   docker ps | grep kafka
   ```

2. Kafka is listening on the correct port:

   ```bash
   docker exec kafka netstat -tulpn | grep 9092
   ```

3. Kafka connection settings in your services match the Docker Compose configuration.

### Topics Not Being Created Automatically

If topics are not being automatically created:

1. Verify `KAFKA_AUTO_CREATE_TOPICS_ENABLE` is set to `"true"` in docker-compose.yml.
2. Ensure `allowAutoTopicCreation: true` is set in the Kafka consumer options in your services.

### Kafka Container Exits Unexpectedly

If Kafka container exits unexpectedly:

1. Check Kafka logs:

   ```bash
   npm run kafka:logs
   ```

2. Ensure Zookeeper is running and healthy before Kafka starts.

3. Try resetting Kafka:
   ```bash
   npm run kafka:reset
   ```

## Advanced Configuration

For more advanced Kafka configuration, refer to:

- [Confluent Kafka Configuration](https://docs.confluent.io/platform/current/installation/configuration/broker-configs.html)
- [NestJS Microservices with Kafka](https://docs.nestjs.com/microservices/kafka)
