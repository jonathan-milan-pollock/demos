import {
  Controller,
  Body,
  Param,
  Put,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Image } from '@dark-rush-photography/shared-types';
import { ImageDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminImagesService } from './admin-images.service';

@Controller('admin/v1/images')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Images')
export class AdminImagesController {
  constructor(private readonly adminImagesService: AdminImagesService) {}

  @Roles('admin')
  @Put()
  @ApiOkResponse({ type: ImageDto })
  addOrUpdate(@Body() image: ImageDto): Observable<Image> {
    return this.adminImagesService.addOrUpdate$(image);
  }

  @Roles('admin')
  @Get()
  @ApiOkResponse({ type: ImageDto })
  findAll(@Query('entityId') entityId: string): Observable<Image[]> {
    return this.adminImagesService.findAll$(entityId);
  }

  @Roles('admin')
  @Get(':slug')
  @ApiOkResponse({ type: ImageDto })
  findOne(
    @Param('slug') slug: string,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(slug, entityId);
  }
}
