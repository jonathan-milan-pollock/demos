import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, VideoDimension } from '@dark-rush-photography/shared-types';
import { VideoDimensionDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminVideoDimensionsService } from './admin-video-dimensions.service';

@Controller('admin/v1/video-dimensions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Video Dimensions')
export class AdminVideoDimensionsController {
  constructor(
    private readonly adminVideoDimensionsService: AdminVideoDimensionsService
  ) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: VideoDimensionDto })
  addOrUpdate$(
    @Body() videoDimension: VideoDimensionDto
  ): Observable<VideoDimension> {
    return this.adminVideoDimensionsService.addOrUpdate$(videoDimension);
  }
}
