import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { SocialMedia } from '@dark-rush-photography/shared/types';
import {
  SocialMediaCreateDto,
  SocialMediaDto,
} from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { AdminSocialMediaService } from './admin-social-media.service';

@Controller('v1/admin/social-media')
@ApiBearerAuth()
@ApiTags('Admin Social Media')
export class AdminSocialMediaController {
  constructor(
    private readonly adminSocialMediaService: AdminSocialMediaService
  ) {}

  @Post()
  @ApiCreatedResponse({ type: SocialMediaDto })
  create$(
    @Body() socialMediaCreate: SocialMediaCreateDto
  ): Observable<SocialMedia> {
    return this.adminSocialMediaService.create$(socialMediaCreate);
  }

  @Get()
  @ApiOkResponse({ type: [SocialMediaDto] })
  findAll$(): Observable<SocialMedia[]> {
    return this.adminSocialMediaService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: SocialMediaDto })
  findOne$(
    @Param('id', ParseObjectIdPipe) id: string
  ): Observable<SocialMedia> {
    return this.adminSocialMediaService.findOne$(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProcess$(@Param('id', ParseObjectIdPipe) id: string): Observable<void> {
    return this.adminSocialMediaService.delete$(id);
  }
}
