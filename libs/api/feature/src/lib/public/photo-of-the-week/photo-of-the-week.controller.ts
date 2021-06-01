import { Controller, Param, Get } from '@nestjs/common';

import { Observable } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller('v1/photo-of-the-week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Public()
  @Get()
  getPhotoOfTheWeek(): Observable<PhotoOfTheWeek[]> {
    return this.photoOfTheWeekService.getPhotoOfTheWeek();
  }

  @Public()
  @Get(':id')
  getPhotoOfTheWeekImage(@Param() id: string): Observable<PhotoOfTheWeek> {
    return this.photoOfTheWeekService.getPhotoOfTheWeekImage(id);
  }
}
