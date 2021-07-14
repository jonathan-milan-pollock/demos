import {
  Controller,
  Body,
  Delete,
  Post,
  Param,
  HttpCode,
  Query,
  Get,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Emotion } from '@dark-rush-photography/shared/types';
import { EmotionAddDto, EmotionDto } from '@dark-rush-photography/api/types';
import {
  ParseObjectIdPipe,
  User,
  UserGuard,
} from '@dark-rush-photography/api/util';
import { UserEmotionsService } from './user-emotions.service';

@Controller('user/emotions')
@UseGuards(UserGuard)
@User()
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
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Emotion> {
    return this.userEmotionsService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.userEmotionsService.remove$(id, entityId);
  }
}
