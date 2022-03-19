import { Types } from 'mongoose';
import { Max, Min, IsString, IsNumber } from 'class-validator';
export class CreatedReviewDto {
  @IsString()
  name: string;
  @IsString()
  title: string;
  @IsString()
  description: string;
  @Min(1)
  @Max(5)
  @IsNumber()
  rating: number;
  productId: string | Types.ObjectId;
}
