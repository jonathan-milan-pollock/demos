import {
  Controller,
  Body,
  Put,
  UseGuards,
  Param,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ADMIN,
  ImageDimension,
  ImageDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  ImageDimensionAddDto,
  ImageDimensionDataDto,
  ImageDimensionDto,
  ImageDimensionUpdateDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminImageDimensionsService } from './admin-image-dimensions.service';

@Controller('admin/v1/image-dimensions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Image Dimensions')
export class AdminImageDimensionsController {
  constructor(
    private readonly adminImageDimensionsService: AdminImageDimensionsService
  ) {}

  @Roles(ADMIN)
  @Post()
  @ApiOkResponse({ type: ImageDimensionDto })
  add$(
    @Query('entityId') entityId: string,
    @Query('imageId') imageId: string,
    @Body() imageDimension: ImageDimensionAddDto
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.add$(
      entityId,
      imageId,
      imageDimension
    );
  }

  @Roles(ADMIN)
  @Put(':id')
  @ApiOkResponse({ type: ImageDimensionDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() imageDimension: ImageDimensionUpdateDto
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.update$(
      id,
      entityId,
      imageDimension
    );
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: ImageDimensionDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.findOne$(id, entityId);
  }

  @Roles(ADMIN)
  @Get(':id/data')
  @ApiOkResponse({ type: ImageDimensionDataDto })
  data$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<ImageDimensionData> {
    return this.adminImageDimensionsService.data$(id, entityId);
  }
}
