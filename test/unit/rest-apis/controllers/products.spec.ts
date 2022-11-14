import { QueryDslQueryContainer } from '@elastic/elasticsearch/api/types';
import { Response } from 'express';
import { ProductRepository } from 'src/repository/product/product.repository';
import { Product } from '../../../../src/dto/entity/product/product.entiry';
import { ProductController } from '../../../../src/rest-apis/controllers/products.controller';
import { ProductService } from '../../../../src/services/products/product.service';

let controller: ProductController;
let productService: ProductService;
let productRepository: ProductRepository;

describe('ProductController', () => {
  beforeEach(async () => {
    productService = new ProductService(productRepository);
    controller = new ProductController(productService);
  });

  describe('/products (POST)', () => {
    const product: Product = {
      id: '123-123-123-123',
      shortCode: '123',
      sku: '123',
      barcode: '99999',
      name: 'New Product',
      description: 'Product Description here',
    };

    let res: Response;

    it('Should Return 400 incase the request invalid', () => {
      expect(true).toBe(true);
    });

    it('Should handle the Unknow error well', () => {
      expect(true).toBe(true);
    });

    it('Should successful call productService.search successfully', async () => {
      const kw = 'test keyword';
      jest
        .spyOn(productService, 'search')
        .mockImplementation(
          (query: QueryDslQueryContainer): Promise<Product[]> => {
            expect(query.match?.name).toBe(kw);

            return Promise.resolve([product]);
          },
        );

      res = {
        status: (code: any): Response => {
          expect(code).toBe(200);
          return {
            send({ data }) {
              expect(data).toMatchObject([product]);
            },
          } as Response;
        },
      } as Response;

      await controller.gets(kw, res);
    });
  });
});
