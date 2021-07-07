import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EmotionProvider,
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
  providers: [UserEmotionsService, EmotionProvider],
})
export class UserEmotionsModule {}
