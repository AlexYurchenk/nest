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
  async update(id: string, dto: TopPageModel) {
    return this.topPageModel.findByIdAndUpdate(id, dto).exec();
  }
  async findByCategory(
    dto: FindTopPageDto,
  ): Promise<DocumentType<TopPageModel>[] | null> {
    return this.topPageModel.find({ firstCategory: dto.firstCategory }).exec();
  }
}
