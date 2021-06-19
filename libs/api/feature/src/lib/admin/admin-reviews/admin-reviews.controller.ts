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
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Review } from '@dark-rush-photography/shared-types';
import { ReviewDto, ReviewUpdateDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminReviewsService } from './admin-reviews.service';

@Controller('admin/v1/reviews')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Roles(ADMIN)
  @Post(':slug')
  @ApiCreatedResponse({ type: ReviewDto })
  create$(@Param('slug') slug: string): Observable<Review> {
    return this.adminReviewsService.create$(slug);
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: ReviewDto })
  update$(
    @Param('id') id: string,
    @Body() review: ReviewUpdateDto
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
