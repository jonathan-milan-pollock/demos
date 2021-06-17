import {
  Body,
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Put,
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

import { ADMIN, SocialMedia } from '@dark-rush-photography/shared-types';
import { SocialMediaDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminSocialMediaService } from './admin-social-media.service';

@Controller('admin/v1/social-media')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Social Media')
export class AdminSocialMediaController {
  constructor(
    private readonly adminSocialMediaService: AdminSocialMediaService
  ) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: SocialMediaDto })
  @ApiConflictResponse()
  @ApiBadRequestResponse()
  create$(@Param('slug') slug: string): Observable<SocialMedia> {
    return this.adminSocialMediaService.create$(slug);
  }

  @Roles(ADMIN)
  @Put('post')
  post$(@Body() socialMedia: SocialMediaDto): Observable<SocialMedia> {
    return this.adminSocialMediaService.post$(socialMedia);
  }

  @Roles(ADMIN)
  @Put('post-mobile-image')
  postMobileImage$(
    @Body() socialMedia: SocialMediaDto
  ): Observable<SocialMedia> {
    return this.adminSocialMediaService.postMobileImage$();
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminSocialMediaService.delete$(id);
  }
}
