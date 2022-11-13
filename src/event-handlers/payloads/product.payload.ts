import { IsNotEmpty, IsOptional } from 'class-validator';
export class ProductPayload {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  shortCode: string;

  @IsNotEmpty()
  barcode: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;
}
