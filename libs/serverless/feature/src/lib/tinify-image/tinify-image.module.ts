import { HttpModule, Module } from '@nestjs/common';

import { TinifyImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { TinifyImageController } from './tinify-image.controller';
import { TinifyImageService } from './tinify-image.service';

@Module({
  imports: [HttpModule],
  controllers: [TinifyImageController],
  providers: [TinifyImageActivityProvider, TinifyImageService],
})
export class TinifyImageModule {}
