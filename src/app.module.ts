import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ReviewModule } from './review/review.module';
import { ProductModule } from './product/product.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { FilesModule } from './files/files.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { TelegramModule } from './telegram/telegram.module';
import { getTelegramConfig } from './configs/telegram.config';
@Module({
  imports: [
    AuthModule,
    TopPageModule,
    ReviewModule,
    ProductModule,
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    FilesModule,
    SitemapModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
