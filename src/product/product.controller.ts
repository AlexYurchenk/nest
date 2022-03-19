import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { CreatedProductDto } from './dto/created-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { PRODUCT_NOT_FOUNDED } from './product.constants';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreatedProductDto) {
    return this.productService.create(dto);
  }
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const result = await this.productService.findById(id);
    if (!result) {
      throw new HttpException(PRODUCT_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const result = await this.productService.delete(id);
    if (!result) {
      throw new HttpException(PRODUCT_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ProductModel,
  ) {
    const result = await this.productService.update(id, dto);
    if (!result) {
      throw new HttpException(PRODUCT_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
    return result;
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {
    return this.productService.findByCategory(dto);
  }
}
