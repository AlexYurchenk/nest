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
    return this.productModel.findById(id);
  }
  async delete(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndDelete(id);
  }
  async update(
    id: string,
    dto: ProductModel,
  ): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndUpdate(id, dto);
  }
  async findByCategory(
    dto: FindProductDto,
  ): Promise<DocumentType<ProductModel>[]> {
    return this.productModel
      .find({ categories: { $all: [dto.category] } })
      .limit(dto.limit);
  }
}
