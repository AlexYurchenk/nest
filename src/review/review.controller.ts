import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatedReviewDto } from './dto/created-revirw.dto';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: CreatedReviewDto) {
    return 'review - create';
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return 'review -delete';
  }
  @Get('byProduct/:id')
  async get(@Param('id') id: string) {
    return 'review -geTbyProduct';
  }
}
