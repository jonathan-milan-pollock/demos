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
  VideoDimensionData,
  VideoDimensionType,
} from '@dark-rush-photography/shared-types';
import { VideoDimensionDataDto } from '@dark-rush-photography/api/types';
import {
  Roles,
  RolesGuard,
  VideoDimensionTypeValidationPipe,
} from '@dark-rush-photography/api/util';
import { AdminVideoDimensionDataService } from './admin-video-dimension-data.service';

@Controller('admin/v1/video-dimension-data')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Video Dimension Data')
export class AdminVideoDimensionDataController {
  constructor(
    private readonly adminVideoDimensionDataService: AdminVideoDimensionDataService
  ) {}

  @Roles(ADMIN)
  @Get(':videoDimensionType')
  @ApiParam({
    name: 'videoDimensionType',
    enum: VideoDimensionType,
  })
  @ApiQuery({
    name: 'entityId',
    type: String,
  })
  @ApiOkResponse({ type: VideoDimensionDataDto })
  find(
    @Param('videoDimensionType', new VideoDimensionTypeValidationPipe())
    videoDimensionType: VideoDimensionType,
    @Query('entityId') entityId: string
  ): Observable<VideoDimensionData[]> {
    return this.adminVideoDimensionDataService.find$(
      entityId,
      videoDimensionType
    );
  }
}
