import { Controller, Param, Post, HttpCode, Get, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ReviewMedia } from '@dark-rush-photography/shared/types';
import { ReviewMediaDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminReviewMediaService } from './admin-review-media.service';

@Controller({ path: 'admin/review-media', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Review Media')
export class AdminReviewMediaController {
  constructor(
    private readonly adminReviewMediaService: AdminReviewMediaService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ReviewMediaDto })
  create$(): Observable<ReviewMedia> {
    return this.adminReviewMediaService.create$();
  }

  @Get()
  @ApiOkResponse({ type: ReviewMediaDto })
  findOne$(): Observable<ReviewMedia> {
    return this.adminReviewMediaService.findOne$();
  }

  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminReviewMediaService.delete$(id);
  }
}
