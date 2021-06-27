import {
  Controller,
  Body,
  Put,
  UseGuards,
  Post,
  Param,
  HttpCode,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Comment } from '@dark-rush-photography/shared-types';
import {
  CommentAddDto,
  CommentDto,
  CommentUpdateDto,
} from '@dark-rush-photography/api/types';
import { RolesGuard } from '@dark-rush-photography/api/util';
import { CommentsService } from './comments.service';

@Controller('user/v1/comments')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Comments User')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('entity')
  @ApiOkResponse({ type: CommentDto })
  addEntityComment$(
    @Query('entityId') entityId: string,
    @Body() comment: CommentAddDto
  ): Observable<Comment> {
    return this.commentsService.addEntityComment$(entityId, comment);
  }

  @Post('media')
  @ApiOkResponse({ type: CommentDto })
  addMediaComment$(
    @Query('entityId') entityId: string,
    @Query('mediaId') mediaId: string,
    @Body() comment: CommentAddDto
  ): Observable<Comment> {
    return this.commentsService.addMediaComment$(entityId, mediaId, comment);
  }

  @Put(':id')
  @ApiOkResponse({ type: CommentDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() comment: CommentUpdateDto
  ): Observable<Comment> {
    return this.commentsService.update$(id, entityId, comment);
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<Comment> {
    return this.commentsService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.commentsService.remove$(id, entityId);
  }
}
