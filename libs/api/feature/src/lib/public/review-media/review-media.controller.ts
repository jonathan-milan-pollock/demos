import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ReviewMediaDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { ReviewMediaService } from './review-media.service';

@Controller({ path: 'review-media', version: '1' })
@Public()
@ApiTags('Public Review Media')
export class ReviewMediaController {
  constructor(private readonly reviewMediaService: ReviewMediaService) {}

  @Get()
  @ApiOkResponse({ type: ReviewMediaDto })
  findOne$(): Observable<ReviewMediaDto> {
    return this.reviewMediaService.findOne$();
  }
}
