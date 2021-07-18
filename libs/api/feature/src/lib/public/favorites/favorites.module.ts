import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  FavoritesProvider,
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
  providers: [FavoritesService, FavoritesProvider, EntityProvider],
})
export class FavoritesModule {}
