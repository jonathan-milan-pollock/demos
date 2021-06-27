import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
  UseGuards,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Image, Review } from '@dark-rush-photography/shared-types';
import {
  FileUploadDto,
  ReviewDto,
  ReviewUpdateDto,
} from '@dark-rush-photography/api/types';
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
  @Get()
  @ApiOkResponse({ type: [ReviewDto] })
  findAll$(): Observable<Review[]> {
    return this.adminReviewsService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: ReviewDto })
  findOne$(@Param('id') id: string): Observable<Review> {
    return this.adminReviewsService.findOne$(id);
  }

  @Roles(ADMIN)
  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  upload$(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ): Observable<Image> {
    return this.adminReviewsService.uploadImage$(id, file);
  }

  @Roles(ADMIN)
  @Post(':id/post')
  post$(@Param('id') id: string): Observable<Review> {
    return this.adminReviewsService.post$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminReviewsService.delete$(id);
  }
}
