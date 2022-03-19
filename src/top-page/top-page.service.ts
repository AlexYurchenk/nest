import { ProductModel } from './../product/product.model';
import { TopPageModel } from './top-page.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CreatedTopPageDto } from './dto/created-top-page.dto';
import { DocumentType } from '@typegoose/typegoose';
import { FindTopPageDto } from './dto/find-top-page.dto';
@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}
  async create(dto: CreatedTopPageDto): Promise<DocumentType<TopPageModel>> {
    return this.topPageModel.create(dto);
  }
  async delete(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findByIdAndDelete(id);
  }
  async findPageById(id: string): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findById(id).exec();
  }
  async update(
    id: string,
    dto: TopPageModel,
  ): Promise<DocumentType<TopPageModel> | null> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
  async findByCategory(dto: FindTopPageDto) {
    return this.topPageModel
      .aggregate([
        { $match: { firstCategory: dto.firstCategory } },
        { $sort: { _id: 1 } },
        {
          $lookup: {
            from: 'Product',
            localField: 'category',
            foreignField: 'categories',
            as: 'products',
          },
        },
        {
          $addFields: {
            productCount: { $size: '$products' },
            products: {
              $function: {
                body: function (products: ProductModel[]) {
                  products.sort(function (a, b) {
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  });

                  return products;
                },
                args: ['$products'],
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
