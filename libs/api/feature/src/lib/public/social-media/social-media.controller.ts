import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { SocialMedia } from '@dark-rush-photography/shared-types';
import { SocialMediaDto } from '@dark-rush-photography/api/types';
import { Public } from '@dark-rush-photography/api/util';
import { SocialMediaService } from './social-media.service';

@Controller('v1/social-media')
@Public()
@ApiTags('Social Media Public')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Get()
  @ApiOkResponse({ type: [SocialMediaDto] })
  findAll$(): Observable<SocialMedia[]> {
    return this.socialMediaService.findAll$();
  }

  @Get(':id')
  @ApiOkResponse({ type: SocialMediaDto })
  findOne$(@Param('id') id: string): Observable<SocialMedia> {
    return this.socialMediaService.findOne$(id);
  }
}
