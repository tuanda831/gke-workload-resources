import { QueryDslQueryContainer } from '@elastic/elasticsearch/api/types';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/dto/entity/product/product.entiry';
import { ProductRepository } from '../../repository/product/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  index(product: Product) {
    this.productRepository.index(product);
  }

  bulkIndex(products: Product[]) {
    this.productRepository.bulk(products);
  }

  search(query: QueryDslQueryContainer): Promise<Product[]> {
    return this.productRepository.search(query);
  }
}
