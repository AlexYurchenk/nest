import { TopPageModel } from './top-page.model';
import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageService } from './top-page.service';
@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: TopPageModel,
        schemaOptions: {
          collection: 'TopPage',
        },
      },
    ]),
  ],
  controllers: [TopPageController],
  providers: [TopPageService],
  exports: [TopPageService],
})
export class TopPageModule {}
