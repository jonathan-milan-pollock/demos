import {
  Controller,
  Body,
  Param,
  Put,
  HttpCode,
  Delete,
  Query,
  Get,
  ParseUUIDPipe,
  ParseEnumPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  Image,
  ImageDimensionType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import {
  ImageAdminDto,
  ImageUpdateDto,
  ThreeSixtySettingsDto,
} from '@dark-rush-photography/api/types';
import {
  AdminAuthGuard,
  AdminRole,
  ParseObjectIdPipe,
} from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';

@Controller({ path: 'admin/images', version: '1' })
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @AdminRole()
  @Put(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  update$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() imageUpdate: ImageUpdateDto
  ): Observable<Image> {
    return this.adminImagesService.update$(id, entityId, imageUpdate);
  }

  @AdminRole()
  @Put(':id/:imageDimensionType/three-sixty-settings')
  @ApiOkResponse({ type: ImageAdminDto })
  updateThreeSixtySettings$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('imageDimensionType', new ParseEnumPipe(ImageDimensionType))
    imageDimensionType: ImageDimensionType,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() threeSixtySettings: ThreeSixtySettingsDto
  ): Observable<Image> {
    return this.adminImagesService.updateThreeSixtySettings$(
      id,
      entityId,
      imageDimensionType,
      threeSixtySettings
    );
  }

  @AdminRole()
  @ApiQuery({
    name: 'state',
    enum: ImageState,
  })
  @Get()
  @ApiOkResponse({ type: [ImageAdminDto] })
  findAll$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Query('state', new ParseEnumPipe(ImageState)) state: ImageState
  ): Observable<ImageAdminDto[]> {
    return this.adminImagesService.findAll$(entityId, state);
  }

  @AdminRole()
  @Get(':id')
  @ApiOkResponse({ type: ImageAdminDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(id, entityId);
  }

  @AdminRole()
  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.adminImagesService.remove$(id, entityId);
  }
}
