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
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageService } from './top-page.service';
import { TOP_PAGE_NOT_FOUNDED } from './top-page.constants';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: CreatedTopPageDto) {
    return this.topPageService.create(dto);
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    const result = await this.topPageService.findPageById(id);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.topPageService.delete(id);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: TopPageModel) {
    const result = await this.topPageService.update(id, dto);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    const result = await this.topPageService.findByCategory(dto);
    if (!result) {
      throw new HttpException(TOP_PAGE_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
}
