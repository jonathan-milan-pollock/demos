import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ContentProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { UserEmotionsService } from './user-emotions.service';
import { UserEmotionsController } from './user-emotions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [UserEmotionsController],
  providers: [UserEmotionsService, ContentProvider],
})
export class UserEmotionsModule {}
