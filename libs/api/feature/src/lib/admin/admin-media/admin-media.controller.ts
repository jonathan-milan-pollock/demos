import { Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { ADMIN, Media } from '@dark-rush-photography/shared-types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { AdminMediaService } from './admin-media.service';

@Controller('admin/v1/media')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Admin Media')
export class AdminMediaController {
  constructor(private readonly adminMediaService: AdminMediaService) {}

  @Roles(ADMIN)
  @Post(':id/post-mobile-image')
  postMobileImage$(): Observable<Media> {
    return this.adminMediaService.postMobileImage$('');
  }

  @Roles(ADMIN)
  @Post(':id/create-png')
  createPng$(): Observable<Media> {
    return this.adminMediaService.createPng$('');
  }

  @Roles(ADMIN)
  @Post(':id/create-apple-icon')
  createAppleIcon$(): Observable<Media> {
    return this.adminMediaService.createPng$('');
  }

  @Roles(ADMIN)
  @Put(':id/create-apple-resource')
  createAppleResource$(): Observable<Media> {
    return this.adminMediaService.createPng$('');
  }
}
