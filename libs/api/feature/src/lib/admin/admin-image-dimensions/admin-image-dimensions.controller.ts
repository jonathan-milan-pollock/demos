import {
  Controller,
  Body,
  Put,
  UseGuards,
  Param,
  Get,
  Post,
  Delete,
  HttpCode,
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
  @Put(':imageDimensionId')
  @ApiOkResponse({ type: ImageDimensionDto })
  update$(
    @Param('imageDimensionId') imageDimensionId: string,
    @Query('entityId') entityId: string,
    @Query('imageId') imageId: string,
    @Body() imageDimension: ImageDimensionUpdateDto
  ): Observable<ImageDimension> {
    return this.adminImageDimensionsService.update$(
      entityId,
      imageId,
      imageDimensionId,
      imageDimension
    );
  }

  @Roles(ADMIN)
  @Get(':imageDimensionId/data')
  @ApiOkResponse({ type: ImageDimensionDataDto })
  find$(
    @Param('imageDimensionId') imageDimensionId: string,
    @Query('entityId') entityId: string,
    @Query('imageId') imageId: string
  ): Observable<ImageDimensionData> {
    return this.adminImageDimensionsService.getData$(
      entityId,
      imageId,
      imageDimensionId
    );
  }

  @Roles(ADMIN)
  @Delete(':imageDimensionId')
  @HttpCode(204)
  delete$(
    @Param('imageDimensionId') imageDimensionId: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.adminImageDimensionsService.remove$(entityId, imageDimensionId);
  }
}
