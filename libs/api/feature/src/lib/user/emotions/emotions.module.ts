import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelProvider,
  DocumentSchema,
  EmotionProvider,
} from '@dark-rush-photography/api/data';
import { EmotionsController } from './emotions.controller';
import { EmotionsService } from './emotions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [EmotionsController],
  providers: [DocumentModelProvider, EmotionProvider, EmotionsService],
})
export class EmotionsModule {}
