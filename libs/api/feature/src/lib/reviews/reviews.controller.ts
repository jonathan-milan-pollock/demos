import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { Review } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @Public()
  async getReviews(): Promise<Review[]> {
    return await this.reviewsService.getReviews();
  }

  @Get(':id')
  async getReview(@Param() id: string): Promise<Review> {
    return this.reviewsService.getReview(id);
  }

  @Post()
  async addReview(@Body() review: Review): Promise<{ id: string }> {
    console.log('adding review');
    const id = await this.reviewsService.addReview(review);
    return { id };
  }

  @Put(':id')
  async updateReview(
    @Param() id: string,
    @Body() review: Review
  ): Promise<{ slug: string }> {
    return {
      slug: await this.reviewsService.updateReview(id, review),
    };
  }

  @Delete(':id')
  async deleteReview(@Param() id: string): Promise<void> {
    await this.reviewsService.deleteReview(id);
  }
}
