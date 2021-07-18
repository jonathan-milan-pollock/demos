import { Controller, Param, Query, Get, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { VideoDto } from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { Public } from '@dark-rush-photography/shared-server/util';
import { VideosService } from './videos.service';

@Controller({ path: 'videos', version: '1' })
@Public()
@ApiTags('Public Videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get(':id')
  @ApiOkResponse({ type: VideoDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<VideoDto> {
    return this.videosService.findOne$(id, entityId);
  }
}
