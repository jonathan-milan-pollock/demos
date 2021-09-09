import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ReviewDto } from '@dark-rush-photography/shared/types';
import { Public } from '@dark-rush-photography/api/util';
import { ReviewsService } from './reviews.service';

@Controller({ path: 'reviews', version: '1' })
@Public()
@ApiTags('Public Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOkResponse({ type: [ReviewDto] })
  findAll$(): Observable<ReviewDto[]> {
    return this.reviewsService.findAll$();
  }
}
