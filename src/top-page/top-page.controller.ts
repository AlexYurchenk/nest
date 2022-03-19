import { TopPageModel } from './top-page.model';
import { CreatedTopPageDto } from './dto/created-top-page.dto';
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
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUNDED } from './top-page.constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreatedTopPageDto) {
    return this.topPageService.create(dto);
  }
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const result = await this.topPageService.findPageById(id);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const result = await this.topPageService.delete(id);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel,
  ) {
    const result = await this.topPageService.update(id, dto);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    const result = await this.topPageService.findByCategory(dto);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
    return result;
  }
  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    const result = await this.topPageService.findPageByText(text);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
