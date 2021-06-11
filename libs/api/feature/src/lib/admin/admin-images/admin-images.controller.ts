import {
  Controller,
  Body,
  Param,
  Put,
  Get,
  HttpCode,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import {
  Image,
  ImageData,
  ImageDimensionType,
} from '@dark-rush-photography/shared-types';
import { ImageDto } from '@dark-rush-photography/api/types';
import {
  ImageDimensionTypeValidationPipe,
  Roles,
  RolesGuard,
} from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';

@Controller('admin/v1/images')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @Roles('admin')
  @Put(':entityId/images')
  @ApiParam({
    name: 'entityId',
    type: String,
  })
  addImage(
    @Param() entityId: string,
    @Body() image: ImageDto
  ): Observable<Image> {
    return this.adminImagesService.addOrUpdateImage(entityId, image);
  }

  @Roles('admin')
  @Get(':entityId/images/:imageDimensionType')
  @ApiParam({
    name: 'entityId',
    type: String,
  })
  @ApiParam({
    name: 'imageDimensionType',
    enum: ImageDimensionType,
  })
  findAllImages(
    @Param() entityId: string,
    @Param('imageDimensionType', new ImageDimensionTypeValidationPipe())
    imageDimensionType: ImageDimensionType
  ): Observable<ImageData[]> {
    return this.adminImagesService.findAllImageData(
      entityId,
      imageDimensionType
    );
  }

  @Roles('admin')
  @Get(':entityId/images/:imageSlug')
  @ApiParam({
    name: 'entityId',
    type: String,
  })
  @ApiParam({
    name: 'imageSlug',
    type: String,
  })
  findImage(
    @Param() entityId: string,
    @Param() imageSlug: string
  ): Observable<Image> {
    return this.adminImagesService.findImage(entityId, imageSlug);
  }
}
