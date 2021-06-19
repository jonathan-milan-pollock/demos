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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

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

  @ApiQuery({
    name: 'mediaId',
    required: false,
    type: String,
  })
  @Post()
  @ApiOkResponse({ type: CommentDto })
  addMediaComment$(
    @Query('entityId') entityId: string,
    @Query('mediaId') mediaId: string,
    @Body() comment: CommentAddDto
  ): Observable<Comment> {
    return this.commentsService.addMediaComment$(entityId, mediaId, comment);
  }

  @Put(':commentId')
  @ApiOkResponse({ type: CommentDto })
  updateImage$(
    @Param('commentId') commentId: string,
    @Query('entityId') entityId: string,
    @Body() comment: CommentUpdateDto
  ): Observable<Comment> {
    return this.commentsService.update$(entityId, commentId, comment);
  }

  @Delete(':commentId')
  @HttpCode(204)
  remove$(
    @Param('commentId') commentId: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.commentsService.remove$(entityId, commentId);
  }
}
