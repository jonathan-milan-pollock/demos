import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContentProvider,
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
  providers: [UserCommentsService, ContentProvider],
})
export class UserCommentsModule {}
