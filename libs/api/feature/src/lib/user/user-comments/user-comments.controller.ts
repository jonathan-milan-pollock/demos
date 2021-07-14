import {
  Controller,
  Body,
  Put,
  Post,
  Param,
  HttpCode,
  Delete,
  Query,
  Get,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Comment } from '@dark-rush-photography/shared/types';
import {
  CommentAddDto,
  CommentDto,
  CommentUpdateDto,
} from '@dark-rush-photography/api/types';
import {
  ParseObjectIdPipe,
  User,
  UserGuard,
} from '@dark-rush-photography/api/util';
import { UserCommentsService } from './user-comments.service';

@Controller({ path: 'user/comments', version: '1' })
@UseGuards(UserGuard)
@User()
@ApiBearerAuth()
@ApiTags('User Comments')
export class UserCommentsController {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  @Post()
  @ApiOkResponse({ type: CommentDto })
  add$(@Body() commentAdd: CommentAddDto): Observable<Comment> {
    return this.userCommentsService.add$(commentAdd);
  }

  @Put(':id')
  @ApiOkResponse({ type: CommentDto })
  update$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string,
    @Body() commentUpdate: CommentUpdateDto
  ): Observable<Comment> {
    return this.userCommentsService.update$(id, entityId, commentUpdate);
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  findOne$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<Comment> {
    return this.userCommentsService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query('entityId', ParseObjectIdPipe) entityId: string
  ): Observable<void> {
    return this.userCommentsService.remove$(id, entityId);
  }
}
