import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  DropboxUpdateProvider,
  DropboxUserProvider,
  Document,
  DocumentSchema,
} from '@dark-rush-photography/api/data';
import { DropboxUserTable } from '@dark-rush-photography/shared-server/data';
import { AdminDropboxService } from './admin-dropbox.service';
import { AdminDropboxController } from './admin-dropbox.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(DropboxUserTable, {
      table: 'DropboxUser',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminDropboxController],
  providers: [AdminDropboxService, DropboxUserProvider, DropboxUpdateProvider],
})
export class AdminDropboxModule {}
