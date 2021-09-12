import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  Document,
  DocumentSchema,
  EmotionProvider,
  UserTable,
} from '@dark-rush-photography/api/data';
import { UserEmotionsService } from './user-emotions.service';
import { UserEmotionsController } from './user-emotions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(UserTable, {
      table: 'User',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [UserEmotionsController],
  providers: [UserEmotionsService, EmotionProvider],
})
export class UserEmotionsModule {}
