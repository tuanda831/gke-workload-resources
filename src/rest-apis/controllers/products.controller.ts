import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Product } from '../../dto/entity/product/product.entiry';
import { ProductService } from '../../services/products/product.service';
import { BaseResponse, MetaDTO } from '../responses/basic.response';
import { ProductDTO } from '../responses/products/products.dto';
import { ApiOkResponseArray } from '../swagger/api-ok-response';

@ApiTags('Products')
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Search Products' })
  @ApiOkResponseArray(ProductDTO, MetaDTO)
  async gets(@Query('kw') kw: string, @Res() res: Response): Promise<void> {
    const prodEntity: Product[] = await this.productService.search({
      match: {
        name: kw,
      },
    });

    return new BaseResponse<ProductDTO[], MetaDTO>(res).success(prodEntity, {
      totalCount: 0,
      offset: 0,
      limit: 0,
    });
  }
}
