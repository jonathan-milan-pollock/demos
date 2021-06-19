import {
  Controller,
  Body,
  UseGuards,
  Delete,
  Post,
  Param,
  HttpCode,
  Query,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Emotion } from '@dark-rush-photography/shared-types';
import { EmotionAddDto } from '@dark-rush-photography/api/types';
import { RolesGuard } from '@dark-rush-photography/api/util';
import { EmotionsService } from './emotions.service';

@Controller('user/v1/emotions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Emotions User')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @ApiQuery({
    name: 'commentId',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'mediaId',
    required: false,
    type: String,
  })
  @Post()
  @ApiOkResponse({ type: EmotionAddDto })
  addEntityComment$(
    @Query('entityId') entityId: string,
    @Query('commentId') commentId: string,
    @Query('mediaId') mediaId: string,
    @Body() emotion: EmotionAddDto
  ): Observable<Emotion> {
    if (!commentId && !mediaId)
      return this.emotionsService.addEntityEmotion$(entityId, emotion);
    if (commentId)
      return this.emotionsService.addCommentEmotion$(
        entityId,
        commentId,
        emotion
      );
    if (mediaId)
      return this.emotionsService.addMediaEmotion$(entityId, mediaId, emotion);

    throw new BadRequestException('Unable to find method to add emotion');
  }

  @Delete(':emotionId')
  @HttpCode(204)
  remove$(
    @Param('emotionId') emotionId: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.emotionsService.remove$(entityId, emotionId);
  }
}
