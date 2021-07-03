import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminSocialMediaService } from './admin-social-media.service';
import { AdminSocialMediaController } from './admin-social-media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminSocialMediaController],
  providers: [
    AdminSocialMediaService,
    EntityProvider,
    ServerlessEntityProvider,
  ],
})
export class AdminSocialMediaModule {}
