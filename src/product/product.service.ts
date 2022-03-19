import { ReviewModel } from './../review/review.model';
import { FindProductDto } from './dto/find-product.dto';
import { CreatedProductDto } from './dto/created-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { DocumentType } from '@typegoose/typegoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel)
    private readonly productModel: ModelType<ProductModel>,
  ) {}
  async create(dto: CreatedProductDto): Promise<DocumentType<ProductModel>> {
    return this.productModel.create(dto);
  }
  async findById(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findById(id).exec();
  }
  async delete(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndDelete(id);
  }
  async update(
    id: string,
    dto: ProductModel,
  ): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
  async findByCategory(dto: FindProductDto) {
    return this.productModel
      .aggregate([
        { $match: { categories: dto.category } },
        { $sort: { _id: 1 } },
        { $limit: dto.limit },
        {
          $lookup: {
            from: 'Review',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
            reviews: {
              $function: {
                body: function (reviews: ReviewModel[]) {
                  reviews.sort(function (a, b) {
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  });

                  return reviews;
                },
                args: ['$reviews'],
                langs: 'js',
                lang: 'js',
              },
            },
          },
        },
      ])
      .exec();
  }
}
