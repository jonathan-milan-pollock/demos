import { HttpModule, Module } from '@nestjs/common';

import { AddImageProvider } from '@dark-rush-photography/serverless/data';
import { AddImageController } from './add-image.controller';
import { AddImageService } from './add-image.service';

@Module({
  imports: [HttpModule],
  controllers: [AddImageController],
  providers: [AddImageProvider, AddImageService],
})
export class AddImageModule {}
