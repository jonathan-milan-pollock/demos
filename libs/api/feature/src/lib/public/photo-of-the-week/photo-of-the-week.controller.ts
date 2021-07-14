import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { PhotoOfTheWeek } from '@dark-rush-photography/shared/types';
import { PhotoOfTheWeekDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/shared-server/util';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller('photo-of-the-week')
@Public()
@ApiTags('Public Photo of the Week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Get()
  @ApiOkResponse({ type: [PhotoOfTheWeekDto] })
  findAll$(): Observable<PhotoOfTheWeek[]> {
    return this.photoOfTheWeekService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: PhotoOfTheWeekDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<PhotoOfTheWeek> {
    return this.photoOfTheWeekService.findOne$(id);
  }
}
