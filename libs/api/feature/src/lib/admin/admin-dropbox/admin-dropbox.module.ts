import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  AboutProvider,
  ClientsDropboxUpdateProvider,
  ClientsDropboxUpdateTable,
  ClientsDropboxUserProvider,
  ClientsDropboxUserTable,
  Document,
  DocumentSchema,
  ImageDimensionProvider,
  ImageProvider,
  ImageUploadProvider,
  WebsitesDropboxUpdateEntitiesProvider,
  WebsitesDropboxUpdateProvider,
  WebsitesDropboxUpdateTable,
  WebsitesDropboxUserProvider,
  WebsitesDropboxUserTable,
} from '@dark-rush-photography/api/data';
import { AdminDropboxService } from './admin-dropbox.service';
import { AdminDropboxController } from './admin-dropbox.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    AzureTableStorageModule.forFeature(WebsitesDropboxUserTable, {
      table: 'WebsitesDropboxUser',
      createTableIfNotExists: true,
    }),
    AzureTableStorageModule.forFeature(ClientsDropboxUserTable, {
      table: 'ClientsDropboxUser',
      createTableIfNotExists: true,
    }),
    AzureTableStorageModule.forFeature(WebsitesDropboxUpdateTable, {
      table: 'WebsitesDropboxUpdate',
      createTableIfNotExists: true,
    }),
    AzureTableStorageModule.forFeature(ClientsDropboxUpdateTable, {
      table: 'ClientsDropboxUpdate',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminDropboxController],
  providers: [
    AdminDropboxService,
    ImageProvider,
    ImageUploadProvider,
    ImageDimensionProvider,
    WebsitesDropboxUserProvider,
    ClientsDropboxUserProvider,
    WebsitesDropboxUpdateProvider,
    ClientsDropboxUpdateProvider,
    WebsitesDropboxUpdateEntitiesProvider,
    AboutProvider
  ],
})
export class AdminDropboxModule {}
