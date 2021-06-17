import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable, of } from 'rxjs';

import { ADMIN, Emotion, Image } from '@dark-rush-photography/shared-types';
import { EmotionDto, ImageDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { EmotionsService } from './emotions.service';

@Controller('user/v1/emotions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: EmotionDto })
  addOrUpdate$(@Body() emotion: EmotionDto): Observable<Emotion> {
    return of(); //this.emotionsService.addOrUpdate$(emotion);
  }
}
