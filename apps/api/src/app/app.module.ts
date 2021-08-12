import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { ScheduleModule } from '@nestjs/schedule';

import { Auth0UserTable } from '@dark-rush-photography/api/data';
import { ApiFeatureModule } from '@dark-rush-photography/api/feature';
import { AuthModule } from './auth.module';
import configuration from '../config/configuration';
import { ConfigProviderModule } from './config-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoDbConnectionString'),
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AzureTableStorageModule.forFeature(Auth0UserTable, {
      table: 'Auth0User',
      createTableIfNotExists: true,
    }),
    ScheduleModule.forRoot(),
    ConfigProviderModule,
    AuthModule,
    ApiFeatureModule,
  ],
})
export class AppModule {}
