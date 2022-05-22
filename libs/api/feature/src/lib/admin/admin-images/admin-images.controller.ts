import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
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
  ImageOrdersDto,
  ImageSelectionsDto,
  ImageStatesDto,
  ImageUpdateDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { ImagesService } from '@dark-rush-photography/api/data';

@Controller({ path: 'admin/images', version: '1' })
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('test-image')
  @ApiCreatedResponse({ type: ImageAdminDto })
  addTestImage$(
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<ImageAdminDto> {
    return this.imagesService.addTestImage$(entityId);
  }

  @Post('load')
  @HttpCode(200)
  @ApiOkResponse({ type: [ImageAdminDto] })
  loadImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageStates: ImageStatesDto
  ): Observable<ImageAdminDto[]> {
    return this.imagesService.loadImages$(entityId, imageStates);
  }

  @Put('update-new-images')
  @HttpCode(204)
  updateNewImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.updateNewImages$(entityId);
  }

  @Put('order-images')
  @HttpCode(204)
  orderImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageOrders: ImageOrdersDto
  ): Observable<void> {
    return this.imagesService.orderImages$(entityId, imageOrders);
  }

  @Put('select-new-images')
  @HttpCode(204)
  selectNewImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageSelections: ImageSelectionsDto
  ): Observable<void> {
    return this.imagesService.selectNewImages$(entityId, imageSelections);
  }

  @Put(':imageId/update-publish-image')
  @HttpCode(204)
  updatePublishImage$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<void> {
    return this.imagesService.updatePublishImage$(
      imageId,
      entityId,
      imageUpdate
    );
  }

  @Put(':imageId/archive')
  @HttpCode(204)
  archiveImage$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.archiveImage$(imageId, entityId);
  }

  @Put(':imageId/unarchive')
  @HttpCode(204)
  unarchiveImage$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.unarchiveImage$(imageId, entityId);
  }

  @Delete(':imageId/publish-image')
  @HttpCode(204)
  removePublishImage$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.removePublishImage$(imageId, entityId);
  }
}
