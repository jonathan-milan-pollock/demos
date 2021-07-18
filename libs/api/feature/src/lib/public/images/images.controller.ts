import { Controller, Param, Query, Get, ParseUUIDPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ImageDto } from '@dark-rush-photography/shared/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { Public } from '@dark-rush-photography/shared-server/util';
import { ImagesService } from './images.service';

@Controller({ path: 'images', version: '1' })
@Public()
@ApiTags('Public Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get(':id')
  @ApiOkResponse({ type: ImageDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageDto> {
    return this.imagesService.findOne$(id, entityId);
  }
}
