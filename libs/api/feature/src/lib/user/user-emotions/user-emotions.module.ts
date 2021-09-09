import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  Auth0UserTable,
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
    AzureTableStorageModule.forFeature(Auth0UserTable, {
      table: 'Auth0User',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [UserEmotionsController],
  providers: [UserEmotionsService, EmotionProvider],
})
export class UserEmotionsModule {}
