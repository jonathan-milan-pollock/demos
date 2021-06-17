import { Controller, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared-types';
import { Public } from '@dark-rush-photography/api/util';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller('v1/photo-of-the-week')
@Public()
@ApiTags('Photo of the Week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Get()
  findAll(): Observable<PhotoOfTheWeek[]> {
    return this.photoOfTheWeekService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<PhotoOfTheWeek> {
    return this.photoOfTheWeekService.findOne(id);
  }
}
