import { TelegramService } from './../telegram/telegram.service';
import { UserId } from './../decorators/user.decorator';
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
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService,
  ) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreatedReviewDto) {
    const message =
      `Name:${dto.name}\n` +
      `Title:${dto.title}\n` +
      `Description:${dto.description}\n` +
      `Rating:${dto.rating}\n` +
      `Product Id:${dto.productId}`;
    await this.telegramService.sendMessage(message);
    return this.reviewService.create(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const result = await this.reviewService.delete(id);
    if (!result) {
      throw new HttpException(REVIEW_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(JwtAuthGuard)
  @Delete('deleteAllReviewsByProductId/:id')
  async deleteByProductId(@Param('id', IdValidationPipe) id: string) {
    const result = await this.reviewService.deleteAllReviewsByProductId(id);
    if (!result) {
      throw new HttpException(REVIEW_NOT_FOUNDED, HttpStatus.NOT_FOUND);
    } else {
      return result;
    }
  }
  @Get('byProduct/:id')
  async get(@Param('id', IdValidationPipe) id: string, @UserId() user: string) {
    console.log(await user);
    return this.reviewService.findByProductId(id);
  }
}
