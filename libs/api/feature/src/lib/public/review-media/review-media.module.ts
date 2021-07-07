import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { ReviewMediaService } from './review-media.service';
import { ReviewMediaController } from './review-media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [ReviewMediaController],
  providers: [ReviewMediaService, EntityProvider],
})
export class ReviewMediaModule {}
