import { Controller, Param, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  PhotoOfTheWeekDto,
  PhotoOfTheWeekMinimalDto,
} from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { PhotoOfTheWeekService } from './photo-of-the-week.service';

@Controller({ path: 'photo-of-the-week', version: '1' })
@Public()
@ApiTags('Public Photo of the Week')
export class PhotoOfTheWeekController {
  constructor(private readonly photoOfTheWeekService: PhotoOfTheWeekService) {}

  @Get()
  @ApiOkResponse({ type: [PhotoOfTheWeekMinimalDto] })
  findAll$(): Observable<PhotoOfTheWeekMinimalDto[]> {
    return this.photoOfTheWeekService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: PhotoOfTheWeekDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<PhotoOfTheWeekDto> {
    return this.photoOfTheWeekService.findOne$(id);
  }
}
