import {
  Controller,
  Param,
  Post,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, ReviewMedia } from '@dark-rush-photography/shared-types';
import { ReviewMediaDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminReviewMediaService } from './admin-review-media.service';

@Controller('admin/v1/review-media')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Review Media')
export class AdminReviewMediaController {
  constructor(
    private readonly adminReviewMediaService: AdminReviewMediaService
  ) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: ReviewMediaDto })
  create$(): Observable<ReviewMedia> {
    return this.adminReviewMediaService.create$();
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminReviewMediaService.delete$(id);
  }
}
