//import * as appInsights from 'applicationinsights';
//appInsights.setup().start();
//TODO: app insights

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .addBearerAuth({
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl:
            'https://darkrushphotography.us.auth0.com/authorize?audience=https://www.darkrushphotography.com',
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
  SwaggerModule.setup('/', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Dark Rush Photography API',
  });

  const port = process.env.PORT || 1111;
  Logger.log(`API listening on port ${port}`, 'bootstrap');
  await app.listen(port);
}

bootstrap();
