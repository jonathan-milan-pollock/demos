import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { Review } from '@dark-rush-photography/shared-types';
import { AdminReviewsService } from './admin-reviews.service';

@Controller('admin/v1/reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Post()
  addReview(@Body() review: Review): Observable<Review> {
    return this.adminReviewsService.addReview(review);
  }

  @Put(':id')
  updateReview(
    @Param() id: string,
    @Body() review: Review
  ): Observable<Review> {
    return this.adminReviewsService.updateReview(id, review);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReview(@Param() id: string): Observable<void> {
    return this.adminReviewsService.deleteReview(id);
  }
}
