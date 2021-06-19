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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { PhotoOfTheWeekUpdateDto } from '@dark-rush-photography/api/types';

@Controller('admin/v1/photo-of-the-week')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Photo of the Week')
export class AdminPhotoOfTheWeekController {
  constructor(
    private readonly adminPhotoOfTheWeekService: AdminPhotoOfTheWeekService
  ) {}

  @Roles(ADMIN)
  @Post()
  create$(@Body() photoOfTheWeek: PhotoOfTheWeek): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.create$(photoOfTheWeek);
  }

  @Roles(ADMIN)
  @Put(':id')
  update$(
    @Param('id') id: string,
    @Body() photoOfTheWeek: PhotoOfTheWeekUpdateDto
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.update$(id, photoOfTheWeek);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.delete$(id);
  }
}
