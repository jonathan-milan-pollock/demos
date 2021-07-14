/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configuration from '../config/configuration';
import { AuthModule } from './auth.module';
import { ApiFeatureModule } from '@dark-rush-photography/api/feature';

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
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ApiFeatureModule,
  ],
})
export class AppModule {}
