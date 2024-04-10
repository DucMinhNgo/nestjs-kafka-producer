import { Controller, Get } from '@nestjs/common';
import { Client, ClientKafka, Transport } from "@nestjs/microservices";
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: 'test' // Should be the same thing we give in consumer
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    // Need to subscribe to topic 
    // so that we can get the response from kafka microservice
    this.client.subscribeToResponseOf('notifications');
    await this.client.connect();
  }

  @Get()
  getHello() {
    return this.client.send('notifications', 'producer send kafka'); // args - topic, message
  }
}