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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';

@Controller('admin/v1/photo-of-the-week')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Photo of the Week')
export class AdminPhotoOfTheWeekController {
  constructor(
    private readonly adminPhotoOfTheWeekService: AdminPhotoOfTheWeekService
  ) {}

  @Roles('admin')
  @Post()
  create(@Body() photoOfTheWeek: PhotoOfTheWeek): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.create(photoOfTheWeek);
  }

  @Roles('admin')
  @Put(':id')
  update(
    @Param() id: string,
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.update(id, photoOfTheWeek);
  }

  @Roles('admin')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param() id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.delete(id);
  }
}
