import { Module } from '@nestjs/common';

import { TinifyImageProcessService } from '@dark-rush-photography/serverless/data';
import { TinifyImageController } from './tinify-image.controller';
import { TinifyImageService } from './tinify-image.service';

@Module({
  controllers: [TinifyImageController],
  providers: [TinifyImageProcessService, TinifyImageService],
})
export class TinifyImageModule {}
