import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';

@Module({
  imports: [ConfigModule],
  controllers: [TopPageController],
})
export class TopPageModule {}
