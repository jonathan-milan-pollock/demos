import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, ImageDimension } from '@dark-rush-photography/shared-types';
import { ImageDimensionDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { ImageDimensionsService } from './image-dimensions.service';

@Controller('v1/image-dimensions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Image Dimensions')
export class ImageDimensionsController {
  constructor(
    private readonly imageDimensionsService: ImageDimensionsService
  ) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: ImageDimensionDto })
  addOrUpdate$(
    @Body() imageDimension: ImageDimensionDto
  ): Observable<ImageDimension> {
    return this.imageDimensionsService.addOrUpdate$(imageDimension);
  }
}
