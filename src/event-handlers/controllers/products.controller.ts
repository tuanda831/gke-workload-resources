import { Controller, Logger, ParseArrayPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EVENT__PRODUCT_CREATION } from 'src/dto/constants/events';
import { ProductService } from '../../services/products/product.service';
import { ProductPayload } from '../payloads/product.payload';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern(EVENT__PRODUCT_CREATION)
  async create(
    @Payload(
      new ParseArrayPipe({
        whitelist: true,
        items: ProductPayload,
      }),
    )
    products: ProductPayload[],
  ) {
    Logger.log(
      JSON.stringify({
        eventName: EVENT__PRODUCT_CREATION,
        payload: products,
      }),
    );

    await this.productService.bulkIndex(products);
  }
}
