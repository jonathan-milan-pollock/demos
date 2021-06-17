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

import { ADMIN, Image } from '@dark-rush-photography/shared-types';
import { ImageDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { ImagesService } from './images.service';

@Controller('v1/images')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: ImageDto })
  addOrUpdate$(@Body() image: ImageDto): Observable<Image> {
    return this.imagesService.addOrUpdate$(image);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: ImageDto })
  findAll$(@Query('entityId') entityId: string): Observable<Image[]> {
    return this.imagesService.findAll$(entityId);
  }

  /*
  @Roles(ADMIN)
  @Get(':slug')
  @ApiOkResponse({ type: ImageDto })
  findOne$(
    @Param('slug') slug: string,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(slug, entityId);
  }*/
}
