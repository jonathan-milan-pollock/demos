import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';

import {
  AdminCronProcessesService,
  CronProcessRepositoryProvider,
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
  providers: [
    {
      provide: CronProcessRepositoryProvider.name,
      useClass: CronProcessRepositoryProvider,
    },
    AdminCronProcessesService,
  ],
})
export class AdminCronProcessesModule {}
