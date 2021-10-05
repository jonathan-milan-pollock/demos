import {
  Controller,
  Body,
  Param,
  Put,
  HttpCode,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ImageAdminDto,
  ImageUpdateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';

@Controller({ path: 'admin/images', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @Put(':imageId')
  @ApiOkResponse({ type: ImageAdminDto })
  update$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<ImageAdminDto> {
    return this.adminImagesService.update$(imageId, entityId, imageUpdate);
  }

  @Put(':imageId/select')
  @ApiOkResponse({ type: ImageAdminDto })
  select$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.adminImagesService.select$(imageId, entityId);
  }

  @Put(':imageId/archive')
  @ApiOkResponse({ type: ImageAdminDto })
  archive$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.adminImagesService.archive$(imageId, entityId);
  }

  @Put(':imageId/unarchive')
  @ApiOkResponse({ type: ImageAdminDto })
  unarchive$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.adminImagesService.unarchive$(imageId, entityId);
  }

  @Delete(':imageId')
  @HttpCode(204)
  remove$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(imageId, entityId);
  }
}
