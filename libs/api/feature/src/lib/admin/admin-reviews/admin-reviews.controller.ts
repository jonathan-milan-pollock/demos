import { Controller, Body, Param, Post, Put, Delete } from '@nestjs/common';

import { Review } from '@dark-rush-photography/shared-types';
import { AdminReviewsService } from './admin-reviews.service';

@Controller('admin/reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Post()
  async addReview(@Body() review: Review): Promise<{ id: string }> {
    const id = await this.adminReviewsService.addReview(review);
    return { id };
  }

  @Put(':id')
  async updateReview(
    @Param() id: string,
    @Body() review: Review
  ): Promise<{ slug: string }> {
    return {
      slug: await this.adminReviewsService.updateReview(id, review),
    };
  }

  @Delete(':id')
  async deleteReview(@Param() id: string): Promise<void> {
    await this.adminReviewsService.deleteReview(id);
  }
}
