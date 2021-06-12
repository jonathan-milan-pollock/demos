import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ImageDimension } from '@dark-rush-photography/shared-types';
import { ImageDimensionDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminImageDimensionsService } from './admin-image-dimensions.service';

@Controller('admin/v1/image-dimensions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Image Dimensions')
export class AdminImageDimensionsController {
  constructor(
    private readonly adminImageDimensionsService: AdminImageDimensionsService
  ) {}

  @Roles('admin')
  @Put()
  @ApiOkResponse({ type: ImageDimensionDto })
  addOrUpdate(
    @Body() imageDimension: ImageDimensionDto
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.addOrUpdate$(imageDimension);
  }
}
