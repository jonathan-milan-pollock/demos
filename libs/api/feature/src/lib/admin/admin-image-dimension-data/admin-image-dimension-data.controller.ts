import { Controller, Param, Get, UseGuards, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ADMIN,
  ImageDimensionData,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { ImageDimensionDataDto } from '@dark-rush-photography/api/types';
import {
  ImageDimensionTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminImageDimensionDataService } from './admin-image-dimension-data.service';

@Controller('admin/v1/image-dimension-data')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Image Dimension Data')
export class AdminImageDimensionDataController {
  constructor(
    private readonly adminImageDimensionDataService: AdminImageDimensionDataService
  ) {}

  @Roles(ADMIN)
  @Get(':imageDimensionType')
  @ApiParam({
    name: 'imageDimensionType',
    enum: ImageDimensionType,
  })
  @ApiQuery({
    name: 'entityId',
    type: String,
  })
  @ApiOkResponse({ type: ImageDimensionDataDto })
  find(
    @Param('imageDimensionType', new ImageDimensionTypeValidationPipe())
    imageDimensionType: ImageDimensionType,
    @Query('entityId') entityId: string
  ): Observable<ImageDimensionData[]> {
    return this.adminImageDimensionDataService.find$(
      entityId,
      imageDimensionType
    );
  }
}
