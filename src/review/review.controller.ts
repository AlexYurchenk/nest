import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReviewService } from './review.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatedReviewDto } from './dto/created-revirw.dto';
import { REVIEW_NOT_FOUNDED } from './review.constants';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreatedReviewDto) {
    return this.reviewService.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const result = await this.reviewService.delete(id);
    if (!result) {
      throw new HttpException(REVIEW_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('deleteAllReviewsByProductId/:id')
  async deleteByProductId(@Param('id') id: string) {
    const result = await this.reviewService.deleteAllReviewsByProductId(id);
    if (!result) {
      throw new HttpException(REVIEW_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @Get('byProduct/:id')
  async get(@Param('id') id: string) {
    return this.reviewService.findByProductId(id);
  }
}
