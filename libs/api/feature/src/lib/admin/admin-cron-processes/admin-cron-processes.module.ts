import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  AdminCronProcessesService,
  CronProcessResponseProvider,
  CronProcessTable,
} from '@dark-rush-photography/api/data';
import { AdminCronProcessesController } from './admin-cron-processes.controller';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(CronProcessTable, {
      table: 'CronProcess',
      createTableIfNotExists: true,
    }),
  ],
  controllers: [AdminCronProcessesController],
  providers: [AdminCronProcessesService, CronProcessResponseProvider],
})
export class AdminCronProcessesModule {}
