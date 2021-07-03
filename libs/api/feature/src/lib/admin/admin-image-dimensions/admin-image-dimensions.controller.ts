import {
  Controller,
  Body,
  Put,
  UseGuards,
  Param,
  Get,
  Post,
  Query,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  ADMIN,
  ImageDimension,
  ImageDimensionData,
} from '@dark-rush-photography/shared/types';
import {
  ImageDimensionAddDto,
  ImageDimensionDataDto,
  ImageDimensionDto,
  ThreeSixtyImageSettingsDto,
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
    @Body() imageDimensionAdd: ImageDimensionAddDto
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.add$(
      entityId,
      imageId,
      imageDimensionAdd
    );
  }

  @Roles(ADMIN)
  @Put(':id/three-sixty-image-settings')
  @ApiOkResponse({ type: ImageDimensionDto })
  updateThreeSixtyImageSettings$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() threeSixtyImageSettings: ThreeSixtyImageSettingsDto
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.updateThreeSixtyImageSettings$(
      id,
      entityId,
      threeSixtyImageSettings
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
  findDataUri$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<ImageDimensionData> {
    return this.adminImageDimensionsService.findDataUri$(id, entityId);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImageDimensionsService.remove$(id, entityId);
  }
}
