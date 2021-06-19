import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  FavoritesProvider,
} from '@dark-rush-photography/api/data';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesProvider, FavoritesService],
})
export class FavoritesModule {}
