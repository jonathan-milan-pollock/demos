import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Document, DocumentSchema } from '@dark-rush-photography/api/data';
import { CommentsModule } from './comments/comments.module';
import { EmotionsModule } from './emotions/emotions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    CommentsModule,
    EmotionsModule,
  ],
})
export class UserModule {}
