import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ReviewMedia } from '@dark-rush-photography/shared-types';
import { ReviewMediaDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { ReviewMediaService } from './review-media.service';

@Controller('v1/review-media')
@Public()
@ApiTags('Review Media Public')
export class ReviewMediaController {
  constructor(private readonly reviewMediaService: ReviewMediaService) {}

  @Get()
  @ApiOkResponse({ type: ReviewMediaDto })
  findOne$(): Observable<ReviewMedia> {
    return this.reviewMediaService.findOne$();
  }
}
