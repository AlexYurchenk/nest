import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { CreatedProductDto } from './dto/created-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: CreatedProductDto) {
    return '';
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    return '';
  }
  @Delete('id')
  async delete(@Param('id') id: string) {
    return '';
  }
  @Patch('id')
  async update(@Param('id') id: string, @Body() dto: ProductModel) {
    return '';
  }
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    return '';
  }
}
