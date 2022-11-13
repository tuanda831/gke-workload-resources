import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from '../repository/database.providers';
import { ProductRepository } from '../repository/product/product.repository';
import { eventBusClientProvider } from '../services/event-publisher/kafka.providers';
import { GracefulShutdown } from '../services/graceful-shutdown';
import { ProductService } from '../services/products/product.service';
import { ProductController } from './controllers/products.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ProductController],
  providers: [
    ...databaseProviders,
    ...eventBusClientProvider,
    ProductRepository,
    ProductService,
    GracefulShutdown,
  ],
})
export class ApisModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
