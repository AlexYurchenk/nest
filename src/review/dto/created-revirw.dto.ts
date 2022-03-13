import { Types } from 'mongoose';
export class CreatedReviewDto {
  name: string;
  title: string;
  description: string;
  rating: number;
  productId: string | Types.ObjectId;
}
