import { HttpModule, Module } from '@nestjs/common';

import { TinifyImageProvider } from '@dark-rush-photography/serverless/data';
import { TinifyImageController } from './tinify-image.controller';
import { TinifyImageService } from './tinify-image.service';

@Module({
  imports: [HttpModule],
  controllers: [TinifyImageController],
  providers: [TinifyImageProvider, TinifyImageService],
})
export class TinifyImageModule {}
