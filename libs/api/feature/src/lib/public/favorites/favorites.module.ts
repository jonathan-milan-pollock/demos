import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityPublicProvider,
  FavoritesProvider,
  ImageDimensionProvider,
  ImageProvider,
  ImageRemoveProvider,
  ImageUploadProvider,
  ImageResizeProvider,
  ImageTinifyProvider,
} from '@dark-rush-photography/api/data';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    EntityPublicProvider,
    FavoritesProvider,
    ImageProvider,
    ImageUploadProvider,
    ImageRemoveProvider,
    ImageDimensionProvider,
    ImageTinifyProvider,
    ImageResizeProvider,
  ],
})
export class FavoritesModule {}
