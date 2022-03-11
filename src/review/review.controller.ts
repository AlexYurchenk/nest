import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatedReviewDto } from './dto/created-revirw.dto';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: CreatedReviewDto) {
    return '';
  }
  @Delete('id')
  async delete(@Param('id') id: string) {
    return '';
  }
  @Get('byProduct/:id')
  async get(@Param('id') id: string) {
    return '';
  }
}
