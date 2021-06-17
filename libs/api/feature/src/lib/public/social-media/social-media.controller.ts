import {
  Body,
  Delete,
  Controller,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { About, ADMIN } from '@dark-rush-photography/shared-types';
import { AboutDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { SocialMediaService } from './social-media.service';

@Controller('v1/social-media')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Social Media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Roles(ADMIN)
  @Delete(':id')
  @HttpCode(204)
  delete$(@Param('id') id: string): Observable<void> {
    return this.socialMediaService.delete$(id);
  }
}
