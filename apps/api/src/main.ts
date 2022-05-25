import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';

import {
  AUTH0_AUDIENCE,
  AUTH0_ISSUER,
} from '@dark-rush-photography/shared/types';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new WsAdapter(app));
  app.useGlobalPipes(
    new ValidationPipe({ disableErrorMessages: environment.production })
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableCors();

  if (!environment.production) {
    const config = new DocumentBuilder()
      .addBearerAuth({
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: `${AUTH0_ISSUER}authorize?audience=${AUTH0_AUDIENCE}`,
            scopes: {},
          },
        },
      })
      .setTitle('Dark Rush Photography API')
      .setDescription('API for Dark Rush Photography')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (_controllerKey: string, methodKey: string) =>
        methodKey,
    });
    SwaggerModule.setup('', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Dark Rush Photography API',
    });
  }

  const port = process.env.PORT || 1111;
  await app.listen(port, () => {
    Logger.log(`API listening on port ${port}`, bootstrap.name);
    Logger.log(`Listening at ws://localhost:${port}`, bootstrap.name);
  });
}

bootstrap();
