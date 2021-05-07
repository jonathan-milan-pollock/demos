import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller('photo-of-the-week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Get()
  getWeeklyPhotos(): PhotoOfTheWeek[] {
    return this.photoOfTheWeekService.getWeeklyPhotos();
  }

  @Get(':slug')
  getPhotoOfTheWeek(@Param() slug: string): PhotoOfTheWeek {
    return this.photoOfTheWeekService.getPhotoOfTheWeek(slug);
  }

  @Post()
  addPhotoOfTheWeek(@Body() photoOfTheWeek: PhotoOfTheWeek): { slug: string } {
    const slug = this.photoOfTheWeekService.addPhotoOfTheWeek(photoOfTheWeek);
    return { slug };
  }
}
