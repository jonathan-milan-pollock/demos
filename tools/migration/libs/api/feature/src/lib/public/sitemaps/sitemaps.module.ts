import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  SitemapMaxPublishedDateProvider,
  SitemapLoadProvider,
  SitemapXmlProvider,
  SitemapsService,
  SitemapPublishedDateProvider,
} from '@dark-rush-photography/api/data';
import { SitemapsController } from './sitemaps.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [SitemapsController],
  providers: [
    SitemapsService,
    SitemapLoadProvider,
    SitemapMaxPublishedDateProvider,
    SitemapPublishedDateProvider,
    SitemapXmlProvider,
  ],
})
export class SitemapsModule {}
