import { Controller, Body, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable, of } from 'rxjs';

import { ADMIN } from '@dark-rush-photography/shared-types';
import { CommentDto } from '@dark-rush-photography/api/types';
import { Roles, RolesGuard } from '@dark-rush-photography/api/util';
import { CommentsService } from './comments.service';

@Controller('user/v1/comments')
@UseGuards(RolesGuard)
@ApiBearerAuth()
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Roles(ADMIN)
  @Put()
  @ApiOkResponse({ type: CommentDto })
  addOrUpdate$(@Body() comment: CommentDto): Observable<Comment> {
    return of(); //this.commentsService.addOrUpdate$(comment);
  }
}
