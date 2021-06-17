import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, ImageDimension } from '@dark-rush-photography/shared-types';
import { ImageDimensionDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { VideoDimensionsService } from './video-dimensions.service';

@Controller('v1/video-dimensions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Video Dimensions')
export class VideoDimensionsController {
  constructor(
    private readonly videoDimensionsService: VideoDimensionsService
  ) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: ImageDimensionDto })
  addOrUpdate$(
    @Body() imageDimension: ImageDimensionDto
  ): Observable<ImageDimension> {
    return this.videoDimensionsService.addOrUpdate$(imageDimension);
  }
}
