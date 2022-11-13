import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { exit } from 'process';

@Injectable()
export class GracefulShutdown implements OnApplicationShutdown {
  @Inject(ClientKafka)
  private readonly eventClient: ClientKafka;

  onApplicationShutdown(signal: string) {
    Logger.log(`Signal "${signal}" Received!`);
    this.eventClient.close();
    exit(0);
  }
}
