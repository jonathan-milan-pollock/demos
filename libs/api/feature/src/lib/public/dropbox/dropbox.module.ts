import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  ClientsDropboxUserProvider,
  ClientsDropboxUserTable,
  WebsitesDropboxUserProvider,
  WebsitesDropboxUserTable,
} from '@dark-rush-photography/api/data';
import { DropboxService } from './dropbox.service';
import { DropboxController } from './dropbox.controller';

@Module({
  imports: [
    HttpModule,
    AzureTableStorageModule.forFeature(WebsitesDropboxUserTable, {
      table: 'WebsitesDropboxUser',
      createTableIfNotExists: true,
    }),
    AzureTableStorageModule.forFeature(ClientsDropboxUserTable, {
      table: 'ClientsDropboxUser',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [DropboxController],
  providers: [
    DropboxService,
    WebsitesDropboxUserProvider,
    ClientsDropboxUserProvider,
  ],
})
export class DropboxModule {}
