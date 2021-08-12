import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityLoadProvider,
  EntityProvider,
} from '@dark-rush-photography/api/data';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, EntityProvider, EntityLoadProvider],
})
export class FavoritesModule {}
