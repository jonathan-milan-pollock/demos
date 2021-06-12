import { HttpModule, Module } from '@nestjs/common';

import { AddImageActivityProvider } from '@dark-rush-photography/serverless/data';
import { AddImageController } from './add-image.controller';
import { AddImageService } from './add-image.service';

@Module({
  imports: [HttpModule],
  controllers: [AddImageController],
  providers: [AddImageActivityProvider, AddImageService],
})
export class AddImageModule {}
