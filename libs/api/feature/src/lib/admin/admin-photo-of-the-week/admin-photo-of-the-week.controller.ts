import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { AdminPhotoOfTheWeekService } from './admin-photo-of-the-week.service';

@Controller('admin/v1/photo-of-the-week')
export class AdminPhotoOfTheWeekController {
  constructor(
    private readonly adminPhotoOfTheWeekService: AdminPhotoOfTheWeekService
  ) {}

  @Post()
  addPhotoOfTheWeek(
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.addPhotoOfTheWeek(photoOfTheWeek);
  }

  @Put(':id')
  updatePhotoOfTheWeek(
    @Param() id: string,
    @Body() photoOfTheWeek: PhotoOfTheWeek
  ): Observable<PhotoOfTheWeek> {
    return this.adminPhotoOfTheWeekService.updatePhotoOfTheWeek(
      id,
      photoOfTheWeek
    );
  }

  @HttpCode(204)
  @Delete(':id')
  deletePhotoOfTheWeek(@Param() id: string): Observable<void> {
    return this.adminPhotoOfTheWeekService.deletePhotoOfTheWeek(id);
  }
}
