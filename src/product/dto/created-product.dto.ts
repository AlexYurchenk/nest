import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductCharacteristic {
  @IsString()
  name: string;
  @IsString()
  value: string;
}

export class CreatedProductDto {
  @IsString()
  image: string;
  @IsString()
  title: string;
  @IsNumber()
  price: number;
  @IsNumber()
  oldPrice?: number;
  @IsNumber()
  credit: number;
  @IsNumber()
  calculatedRating: number;
  @IsString()
  description: string;
  @IsString()
  advantages: string;
  @IsString()
  disadvantages: string;
  @IsArray()
  @IsString({ each: true })
  categories: string[];
  @IsArray()
  @IsString({ each: true })
  tags: string[];
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductCharacteristic)
  characteristic: ProductCharacteristic[];
}
