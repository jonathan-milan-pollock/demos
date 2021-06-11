import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Review } from '@dark-rush-photography/shared-types';
import { AdminReviewsService } from './admin-reviews.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { ReviewDto } from '@dark-rush-photography/api/types';

@Controller('admin/v1/reviews')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Roles('admin')
  @Post()
  create(@Body() review: ReviewDto): Observable<Review> {
    return this.adminReviewsService.create(review);
  }

  @Roles('admin')
  @Put(':id')
  update(@Param() id: string, @Body() review: ReviewDto): Observable<Review> {
    return this.adminReviewsService.update(id, review);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() id: string): Observable<void> {
    return this.adminReviewsService.delete(id);
  }
}
