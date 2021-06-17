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

import { ADMIN, Review } from '@dark-rush-photography/shared-types';
import { AdminReviewsService } from './admin-reviews.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { ReviewRequestDto } from '@dark-rush-photography/api/types';

@Controller('admin/v1/reviews')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Roles(ADMIN)
  @Post()
  create$(@Body() review: ReviewRequestDto): Observable<Review> {
    return this.adminReviewsService.create$(review);
  }

  @Roles(ADMIN)
  @Put(':id')
  update$(
    @Param('id') id: string,
    @Body() review: ReviewRequestDto
  ): Observable<Review> {
    return this.adminReviewsService.update$(id, review);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminReviewsService.delete$(id);
  }
}
