/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsString, IsInt, Min } from 'class-validator';
export class AddToCartDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
