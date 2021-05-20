import { Controller, Param, Get } from '@nestjs/common';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller('photo-of-the-week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Get()
  @Public()
  async getPhotoOfTheWeek(): Promise<PhotoOfTheWeek[]> {
    return await this.photoOfTheWeekService.getPhotoOfTheWeek();
  }

  @Get(':id')
  @Public()
  async getPhotoOfTheWeekImage(@Param() id: string): Promise<PhotoOfTheWeek> {
    return this.photoOfTheWeekService.getPhotoOfTheWeekImage(id);
  }
}
