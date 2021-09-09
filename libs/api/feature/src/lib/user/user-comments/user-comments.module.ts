import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  CommentProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { UserCommentsService } from './user-comments.service';
import { UserCommentsController } from './user-comments.controller';
import { Auth0UserTable } from '@dark-rush-photography/api/data';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(Auth0UserTable, {
      table: 'Auth0User',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [UserCommentsController],
  providers: [UserCommentsService, CommentProvider],
})
export class UserCommentsModule {}
