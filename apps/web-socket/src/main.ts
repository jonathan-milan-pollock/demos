import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {},
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new WsAdapter(app));

  const port = process.env.PORT || 2222;
  await app.listen(port, () => {
    Logger.log(`Listening at ws://localhost:${port}`, bootstrap.name);
  });
}

bootstrap();
