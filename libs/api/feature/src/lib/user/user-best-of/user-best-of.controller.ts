import {
  Controller,
  Put,
  Delete,
  Param,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { Observable, of } from 'rxjs';

import { BestOfType, EmotionType } from '@dark-rush-photography/shared-types';
import { EmotionDto } from '@dark-rush-photography/api/types';
import { UserBestOfService } from './user-best-of.service';

@Controller('v1/user/best-of')
@ApiTags('user')
@ApiBearerAuth()
export class UserBestOfController {
  constructor(private readonly userBestOfService: UserBestOfService) {}

  @Post(':id/:imageSlug/:emotion')
  @ApiParam({
    name: 'imageSlug',
    type: String,
  })
  findOne(
    @Param() id: string,
    @Param() imageSlug: string,
    @Param() emotionType: EmotionType
  ): Observable<EmotionDto> {
    return of(); //return this.userBestOfService.create(id, imageSlug);
  }

  @Post()
  create(@Body() imageEmotion: EmotionDto): void {
    //this.imageEmotionService.create(documentType, slug, id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() imageEmotion: EmotionDto): void {
    //  this.imageEmotionService.update(documentType, slug, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    //    this.imageEmotionService.delete(documentType, slug, id);
  }
}
