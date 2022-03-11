import { TopPageModel } from './top-page.model';
import { CreatedTopPageDto } from './dto/created-top-page.dto';
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
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: CreatedTopPageDto) {
    return 'top-page -create';
  }
  @Get(':id')
  async get(@Param('id') id: string) {
    return 'top-page -get';
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return 'top-page -delete';
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: TopPageModel) {
    return 'top-page -update';
  }
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    return 'top-page -find';
  }
}