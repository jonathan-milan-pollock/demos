import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentModelService,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { AdminFavoritesController } from './admin-favorites.controller';
import { AdminFavoritesService } from './admin-favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AdminFavoritesController],
  providers: [DocumentModelService, AdminFavoritesService],
})
export class AdminFavoritesModule {}
