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

import { Comment } from '@dark-rush-photography/shared/types';
import {
  CommentAddDto,
  CommentDto,
  CommentUpdateDto,
} from '@dark-rush-photography/api/types';
import { RolesGuard } from '@dark-rush-photography/api/util';
import { UserCommentsService } from './user-comments.service';

@Controller('user/v1/comments')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('User Comments')
export class UserCommentsController {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  @Post()
  @ApiOkResponse({ type: CommentDto })
  addEntityComment$(@Body() commentAdd: CommentAddDto): Observable<Comment> {
    return this.userCommentsService.add$(commentAdd);
  }

  @Put(':id')
  @ApiOkResponse({ type: CommentDto })
  update$(
    @Param('id') id: string,
    @Query('entityId') entityId: string,
    @Body() commentUpdate: CommentUpdateDto
  ): Observable<Comment> {
    return this.userCommentsService.update$(id, entityId, commentUpdate);
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  findOne$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<Comment> {
    return this.userCommentsService.findOne$(id, entityId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove$(
    @Param('id') id: string,
    @Query('entityId') entityId: string
  ): Observable<void> {
    return this.userCommentsService.remove$(id, entityId);
  }
}
