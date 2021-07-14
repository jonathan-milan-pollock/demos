import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Review } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { ReviewsService } from './reviews.service';
import { ReviewDto } from '@dark-rush-photography/api/types';

@Controller('reviews')
@Public()
@ApiTags('Public Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOkResponse({ type: [ReviewDto] })
  findAll$(): Observable<Review[]> {
    return this.reviewsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewDto })
  findOne$(@Param('id', ParseObjectIdPipe) id: string): Observable<Review> {
    return this.reviewsService.findOne$(id);
  }
}
