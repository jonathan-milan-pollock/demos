import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ApiFeatureModule } from '@dark-rush-photography/api/feature';
import configuration from '../config/configuration';
import { AuthModule } from './auth.module';
import { ConfigProviderModule } from './config-provider.module';
import { WebSocketMessageProviderModule } from './web-socket-message-provider.module';

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
    AuthModule,
    ConfigProviderModule,
    WebSocketMessageProviderModule,
    ApiFeatureModule,
  ],
})
export class AppModule {}
