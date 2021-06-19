import {
  Controller,
  Body,
  Put,
  UseGuards,
  Post,
  Param,
  Delete,
  HttpCode,
  Get,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ADMIN,
  VideoDimension,
  VideoDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  VideoDimensionAddDto,
  VideoDimensionDataDto,
  VideoDimensionDto,
  VideoDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminVideoDimensionsService } from './admin-video-dimensions.service';

@Controller('admin/v1/video-dimensions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Video Dimensions')
export class AdminVideoDimensionsController {
  constructor(
    private readonly adminVideoDimensionsService: AdminVideoDimensionsService
  ) {}

  @Roles(ADMIN)
  @Post()
  @ApiOkResponse({ type: VideoDimensionDto })
  add$(
    @Query('entityId') entityId: string,
    @Query('videoId') videoId: string,
    @Body() videoDimension: VideoDimensionAddDto
  ): Observable<VideoDimension> {
    return this.adminVideoDimensionsService.add$(
      entityId,
      videoId,
      videoDimension
    );
  }

  @Roles(ADMIN)
  @Put(':videoDimensionId')
  @ApiOkResponse({ type: VideoDimensionDto })
  update$(
    @Param('videoDimensionId') videoDimensionId: string,
    @Query('entityId') entityId: string,
    @Query('videoId') videoId: string,
    @Body() videoDimension: VideoDimensionUpdateDto
  ): Observable<VideoDimension> {
    return this.adminVideoDimensionsService.update$(
      entityId,
      videoId,
      videoDimensionId,
      videoDimension
    );
  }

  @Roles(ADMIN)
  @Get(':videoDimensionId/data')
  @ApiOkResponse({ type: VideoDimensionDataDto })
  find$(
    @Param('videoDimensionId') videoDimensionId: string,
    @Query('entityId') entityId: string,
    @Query('videoId') videoId: string
  ): Observable<VideoDimensionData> {
    return this.adminVideoDimensionsService.getData$(
      entityId,
      videoId,
      videoDimensionId
    );
  }

  @Roles(ADMIN)
  @Delete(':videoDimensionId')
  @HttpCode(204)
  delete$(
    @Param('videoDimensionId') videoDimensionId: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminVideoDimensionsService.remove$(entityId, videoDimensionId);
  }
}
