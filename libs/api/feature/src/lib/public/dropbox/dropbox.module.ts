import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import { DropboxUserProvider } from '@dark-rush-photography/api/data';
import { DropboxUserTable } from '@dark-rush-photography/shared-server/data';
import { DropboxService } from './dropbox.service';
import { DropboxController } from './dropbox.controller';

@Module({
  imports: [
    HttpModule,
    AzureTableStorageModule.forFeature(DropboxUserTable, {
      table: 'DropboxUser',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [DropboxController],
  providers: [DropboxService, DropboxUserProvider],
})
export class DropboxModule {}
