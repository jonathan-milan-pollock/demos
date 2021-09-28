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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Emotion } from '@dark-rush-photography/shared/types';
import { EmotionAddDto, EmotionDto } from '@dark-rush-photography/api/types';
import { ParseObjectIdPipe } from '@dark-rush-photography/api/util';
import { UserEmotionsService } from './user-emotions.service';

@Controller({ path: 'user/emotions', version: '1' })
@ApiBearerAuth()
@ApiTags('User Emotions')
export class UserEmotionsController {
  constructor(private readonly userEmotionsService: UserEmotionsService) {}

  @Post()
  @ApiOkResponse({ type: EmotionDto })
  addEntityEmotion$(@Body() emotionAdd: EmotionAddDto): Observable<Emotion> {
    return this.userEmotionsService.add$(emotionAdd);
  }

  @Get()
  @ApiQuery({
    name: 'imageId',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'commentId',
    required: false,
    type: String,
  })
  @ApiOkResponse({ type: [EmotionDto] })
  findAll$(
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Query('imageId', new ParseUUIDPipe({ version: '4' })) imageId: string,
    @Query('commentId', new ParseUUIDPipe({ version: '4' })) commentId: string
  ): Observable<Emotion[]> {
    return this.userEmotionsService.findAll$(entityId, imageId, commentId);
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
