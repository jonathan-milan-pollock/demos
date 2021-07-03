import {
  Controller,
  Body,
  UseGuards,
  Delete,
  Post,
  Param,
  HttpCode,
  Query,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Emotion } from '@dark-rush-photography/shared/types';
import { EmotionAddDto, EmotionDto } from '@dark-rush-photography/api/types';
import { RolesGuard } from '@dark-rush-photography/api/util';
import { UserEmotionsService } from './user-emotions.service';

@Controller('user/v1/emotions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('User Emotions')
export class UserEmotionsController {
  constructor(private readonly userEmotionsService: UserEmotionsService) {}

  @Post()
  @ApiOkResponse({ type: EmotionDto })
  addEntityEmotion$(@Body() emotionAdd: EmotionAddDto): Observable<Emotion> {
    return this.userEmotionsService.add$(emotionAdd);
  }

  @Get(':id')
  @ApiOkResponse({ type: EmotionDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<Emotion> {
    return this.userEmotionsService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.userEmotionsService.remove$(id, entityId);
  }
}
