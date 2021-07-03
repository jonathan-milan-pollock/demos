import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';
import { AdminMediaProcessesService } from './admin-media-processes.service';
import { AdminMediaProcessesController } from './admin-media-processes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    HttpModule,
  ],
  controllers: [AdminMediaProcessesController],
  providers: [
    AdminMediaProcessesService,
    EntityProvider,
    ServerlessEntityProvider,
  ],
})
export class AdminMediaProcessesModule {}
