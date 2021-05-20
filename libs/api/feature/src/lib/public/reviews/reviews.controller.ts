import { Controller, Param, Get } from '@nestjs/common';

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
  @Public()
  async getReview(@Param() id: string): Promise<Review> {
    return this.reviewsService.getReview(id);
  }
}
