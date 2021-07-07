import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CommentProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { UserCommentsService } from './user-comments.service';
import { UserCommentsController } from './user-comments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [UserCommentsController],
  providers: [UserCommentsService, CommentProvider],
})
export class UserCommentsModule {}
