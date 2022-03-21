import { ConfigModule } from '@nestjs/config';
import { TopPageModule } from './../top-page/top-page.module';
import { Module } from '@nestjs/common';
import { SitemapController } from './sitemap.controller';

@Module({
  imports: [TopPageModule, ConfigModule],
  controllers: [SitemapController],
})
export class SitemapModule {}
