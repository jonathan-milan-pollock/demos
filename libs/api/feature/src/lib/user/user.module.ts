import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { UserCommentsModule } from './user-comments/user-comments.module';
import { UserEmotionsModule } from './user-emotions/user-emotions.module';

@Module({
  imports: [
        //TODO: Don't believe this is needed
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    UserCommentsModule,
    UserEmotionsModule,
  ],
})
export class UserModule {}
