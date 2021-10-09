import {
  Controller,
  Body,
  Param,
  Put,
  HttpCode,
  Delete,
  Query,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ImageAdminDto,
  ImageUpdateDto,
  ThreeSixtyImageAddDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { ImagesService } from '@dark-rush-photography/api/data';

@Controller({ path: 'admin/images', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('three-sixty-image')
  @ApiCreatedResponse({ type: ImageAdminDto })
  addThreeSixtyImage$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() threeSixtyImageAdd: ThreeSixtyImageAddDto
  ): Observable<ImageAdminDto> {
    return this.imagesService.addThreeSixtyImage$(entityId, threeSixtyImageAdd);
  }

  @Put(':imageId')
  @ApiOkResponse({ type: ImageAdminDto })
  update$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<ImageAdminDto> {
    return this.imagesService.update$(imageId, entityId, imageUpdate);
  }

  @Put(':imageId/select')
  @ApiOkResponse({ type: ImageAdminDto })
  select$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.imagesService.select$(imageId, entityId);
  }

  @Put(':imageId/archive')
  @ApiOkResponse({ type: ImageAdminDto })
  archive$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.imagesService.archive$(imageId, entityId);
  }

  @Put(':imageId/unarchive')
  @ApiOkResponse({ type: ImageAdminDto })
  unarchive$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.imagesService.unarchive$(imageId, entityId);
  }

  @Delete(':imageId')
  @HttpCode(204)
  remove$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.remove$(imageId, entityId);
  }
}
