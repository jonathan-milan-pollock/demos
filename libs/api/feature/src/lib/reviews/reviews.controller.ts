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
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getReviewsAsync(): Promise<Review[]> {
    return await this.reviewsService.getReviewsAsync();
  }

  @Get(':id')
  async getReview(@Param() id: string): Promise<Review> {
    return this.reviewsService.getReviewAsync(id);
  }

  @Post()
  async addReviewAsync(@Body() review: Review): Promise<{ id: string }> {
    const id = await this.reviewsService.addReviewAsync(review);
    return { id };
  }

  @Put(':id')
  async updateDestination(
    @Param() id: string,
    @Body() review: Review
  ): Promise<{ id: string }> {
    return {
      id: await this.reviewsService.updateReviewAsync(id, review),
    };
  }

  @Delete(':id')
  async deleteDestination(@Param() id: string): Promise<void> {
    await this.reviewsService.deleteReviewAsync(id);
  }
}
