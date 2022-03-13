import { CreatedReviewDto } from './dto/created-revirw.dto';
import { ReviewModel } from './review.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel)
    private readonly reviewModel: ModelType<ReviewModel>,
  ) {}
  async create(dto: CreatedReviewDto): Promise<DocumentType<ReviewModel>> {
    dto.productId = new Types.ObjectId(dto.productId);
    return this.reviewModel.create(dto);
  }
  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id);
  }
  async findByProductId(id: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(id) });
  }
  async deleteAllReviewsByProductId(id: string): Promise<
    { ok?: number | undefined; n?: number | undefined } & {
      deletedCount?: number | undefined;
    }
  > {
    return this.reviewModel
      .deleteMany({ productId: new Types.ObjectId(id) })
      .exec();
  }
}
