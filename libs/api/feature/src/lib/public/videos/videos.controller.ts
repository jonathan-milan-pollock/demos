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
import { VideosService } from './videos.service';

@Controller('v1/videos')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: ImageDto })
  addOrUpdate$(@Body() image: ImageDto): Observable<Image> {
    return this.videosService.addOrUpdate$(image);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: ImageDto })
  findAll$(@Query('entityId') entityId: string): Observable<Image[]> {
    return this.videosService.findAll$(entityId);
  }

  @Roles(ADMIN)
  @Get(':slug')
  @ApiOkResponse({ type: ImageDto })
  findOne$(
    @Param('slug') slug: string,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.videosService.findOne$(slug, entityId);
  }
}
