import { Controller, Param, Get } from '@nestjs/common';

import { Observable } from 'rxjs';

import { Review } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { ReviewsService } from './reviews.service';

@Controller('v1/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Public()
  @Get()
  getReviews(): Observable<Review[]> {
    return this.reviewsService.getReviews();
  }

  @Public()
  @Get(':id')
  getReview(@Param() id: string): Observable<Review> {
    return this.reviewsService.getReview(id);
  }
}
