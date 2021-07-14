import {
  Controller,
  Body,
  Param,
  Post,
  HttpCode,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Review } from '@dark-rush-photography/shared/types';
import { ReviewDto, ReviewUpdateDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminReviewsService } from './admin-reviews.service';

@Controller('v1/admin/reviews')
@ApiBearerAuth()
@ApiTags('Admin Reviews')
export class AdminReviewsController {
  constructor(private readonly adminReviewsService: AdminReviewsService) {}

  @Post(':slug')
  @ApiCreatedResponse({ type: ReviewDto })
  create$(@Param('slug') slug: string): Observable<Review> {
    return this.adminReviewsService.create$(slug);
  }

  @Put(':id')
  @ApiOkResponse({ type: ReviewDto })
  update$(
    @Param('id') id: string,
    @Body() reviewUpdate: ReviewUpdateDto
  ): Observable<Review> {
    return this.adminReviewsService.update$(id, reviewUpdate);
  }

  @Post(':id/post')
  @HttpCode(204)
  postProcess$(@Param('id') id: string): Observable<void> {
    return this.adminReviewsService.post$(id);
  }

  @Get()
  @ApiOkResponse({ type: [ReviewDto] })
  findAll$(): Observable<Review[]> {
    return this.adminReviewsService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReviewDto })
  findOne$(@Param('id', ParseObjectIdPipe) id: string): Observable<Review> {
    return this.adminReviewsService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProcess$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminReviewsService.delete$(id);
  }
}
