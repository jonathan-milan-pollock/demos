import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Review } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { ReviewsService } from './reviews.service';

@Controller('v1/reviews')
@Public()
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll(): Observable<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Review> {
    return this.reviewsService.findOne(id);
  }
}
