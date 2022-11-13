import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { Product } from '../../dto/entity/product/product.entiry';
import { BaseRepository } from '../base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(client: Client) {
    super(client);
    this.setIndexName('products');
  }
}
