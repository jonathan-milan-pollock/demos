import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminFavoritesService } from './admin-favorites.service';
import { AdminFavoritesController } from './admin-favorites.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminFavoritesController],
  providers: [AdminFavoritesService, EntityProvider, ServerlessEntityProvider],
})
export class AdminFavoritesModule {}
