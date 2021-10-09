import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Document,
  DocumentSchema,
  SitemapLoadMaxDatePublishedProvider,
  SitemapLoadProvider,
  SitemapLoadXmlProvider,
  SitemapsService,
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
    SitemapLoadMaxDatePublishedProvider,
    SitemapLoadXmlProvider,
  ],
})
export class SitemapsModule {}
