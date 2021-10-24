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

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ type: [ImageAdminDto] })
  load$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageStates: ImageStatesDto
  ): Observable<ImageAdminDto[]> {
    return this.imagesService.load$(entityId, imageStates);
  }

  @Put('update-new-images')
  @HttpCode(204)
  updateNewImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.updateNewImages$(entityId);
  }

  @Put('order-publish-images')
  @HttpCode(204)
  orderPublishImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageOrders: ImageOrdersDto
  ): Observable<void> {
    return this.imagesService.orderPublishImages$(entityId, imageOrders);
  }

  @Put('select-new-images')
  @HttpCode(204)
  selectNewImages$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageSelections: ImageSelectionsDto
  ): Observable<void> {
    return this.imagesService.selectNewImages$(entityId, imageSelections);
  }

  @Put(':imageId')
  @HttpCode(204)
  update$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<void> {
    return this.imagesService.update$(imageId, entityId, imageUpdate);
  }

  @Put(':imageId/archive')
  @HttpCode(204)
  archive$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.archive$(imageId, entityId);
  }

  @Put(':imageId/unarchive')
  @HttpCode(204)
  unarchive$(
    @Param('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.imagesService.unarchive$(imageId, entityId);
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
