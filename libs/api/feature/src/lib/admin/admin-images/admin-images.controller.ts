import {
  Controller,
  Body,
  Param,
  Put,
  Get,
  UseGuards,
  Query,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Image, PostedState } from '@dark-rush-photography/shared-types';
import { ImageDto } from '@dark-rush-photography/api/types';
import {
  PostedStateValidationPipe,
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

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: ImageDto })
  addOrUpdate$(@Body() image: ImageDto): Observable<Image> {
    return this.adminImagesService.addOrUpdate$(image);
  }

  @Roles(ADMIN)
  @Get(':postedState')
  @ApiOkResponse({ type: [ImageDto] })
  findAll$(
    @Param('postedState', new PostedStateValidationPipe())
    postedState: PostedState,
    @Query('entityId') entityId: string
  ): Observable<Image[]> {
    return this.adminImagesService.findAll$(entityId, postedState);
  }

  @Roles(ADMIN)
  @Get(':slug/:postedState')
  @ApiOkResponse({ type: ImageDto })
  findOne$(
    @Param('slug') slug: string,
    @Param('postedState', new PostedStateValidationPipe())
    postedState: PostedState,
    @Query('entityId') entityId: string
  ): Observable<Image> {
    return this.adminImagesService.findOne$(entityId, slug, postedState);
  }

  @Roles(ADMIN)
  @Post('360')
  @ApiOkResponse({ type: ImageDto })
  create360Image$(@Body() image: ImageDto): Observable<Image> {
    return this.adminImagesService.create360Image$(image);
  }

  @Roles(ADMIN)
  @Post('png')
  @ApiOkResponse({ type: ImageDto })
  createTinifiedPng$(@Body() image: ImageDto): Observable<Image> {
    return this.adminImagesService.createTinifiedPng$(image);
  }

  @Roles(ADMIN)
  @Post('apple-icons')
  @ApiOkResponse({ type: ImageDto })
  createAppleIcons$(@Body() image: ImageDto): Observable<Image> {
    return this.adminImagesService.createAppleIcons$(image);
  }

  @Roles(ADMIN)
  @Post('apple-image-resources')
  @ApiOkResponse({ type: ImageDto })
  processAppleImageResources$(@Body() image: ImageDto): Observable<Image> {
    return this.adminImagesService.createAppleImageResources$(image);
  }
}
