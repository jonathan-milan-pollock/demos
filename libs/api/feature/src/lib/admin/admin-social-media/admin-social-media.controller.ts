import {
  Body,
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, SocialMedia } from '@dark-rush-photography/shared-types';
import {
  SocialMediaCreateDto,
  SocialMediaDto,
} from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminSocialMediaService } from './admin-social-media.service';

@Controller('admin/v1/social-media')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Social Media')
export class AdminSocialMediaController {
  constructor(
    private readonly adminSocialMediaService: AdminSocialMediaService
  ) {}

  @Roles(ADMIN)
  @Post()
  @ApiCreatedResponse({ type: SocialMediaDto })
  create$(@Body() socialMedia: SocialMediaCreateDto): Observable<SocialMedia> {
    return this.adminSocialMediaService.create$(socialMedia);
  }

  @Roles(ADMIN)
  @Get()
  @ApiOkResponse({ type: [SocialMediaDto] })
  findAll$(): Observable<SocialMedia[]> {
    return this.adminSocialMediaService.findAll$();
  }

  @Roles(ADMIN)
  @Get(':id')
  @ApiOkResponse({ type: SocialMediaDto })
  findOne$(@Param('id') id: string): Observable<SocialMedia> {
    return this.adminSocialMediaService.findOne$(id);
  }

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.adminSocialMediaService.delete$(id);
  }
}
