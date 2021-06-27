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

import { Emotion } from '@dark-rush-photography/shared-types';
import { EmotionAddDto, EmotionDto } from '@dark-rush-photography/api/types';
import { RolesGuard } from '@dark-rush-photography/api/util';
import { EmotionsService } from './emotions.service';

@Controller('user/v1/emotions')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Emotions User')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Post('entity')
  @ApiOkResponse({ type: EmotionDto })
  addEntityEmotion$(
    @Query('entityId') entityId: string,
    @Body() emotion: EmotionAddDto
  ): Observable<Emotion> {
    return this.emotionsService.addEntityEmotion$(entityId, emotion);
  }

  @Post('media')
  @ApiOkResponse({ type: EmotionDto })
  addEntityComment$(
    @Query('entityId') entityId: string,
    @Query('mediaId') mediaId: string,
    @Body() emotion: EmotionAddDto
  ): Observable<Emotion> {
    return this.emotionsService.addMediaEmotion$(entityId, mediaId, emotion);
  }

  @Post('comment')
  @ApiOkResponse({ type: EmotionDto })
  addCommentEmotion$(
    @Query('entityId') entityId: string,
    @Query('commentId') commentId: string,
    @Body() emotion: EmotionAddDto
  ): Observable<Emotion> {
    return this.emotionsService.addCommentEmotion$(
      entityId,
      commentId,
      emotion
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: EmotionDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<Emotion> {
    return this.emotionsService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.emotionsService.remove$(id, entityId);
  }
}
