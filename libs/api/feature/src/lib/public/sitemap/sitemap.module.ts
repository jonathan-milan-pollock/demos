import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  EntityFindAllPublicProvider,
} from '@dark-rush-photography/api/data';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [SitemapController],
  providers: [SitemapService, EntityFindAllPublicProvider],
})
export class SitemapModule {}
