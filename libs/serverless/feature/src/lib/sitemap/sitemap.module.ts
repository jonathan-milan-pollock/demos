import { HttpModule, Module } from '@nestjs/common';

import {
  AzureStorageProvider,
  SitemapProvider,
} from '@dark-rush-photography/serverless/data';
import { SitemapService } from './sitemap.service';
import { SitemapController } from './sitemap.controller';

@Module({
  imports: [HttpModule],
  controllers: [SitemapController],
  providers: [SitemapService, SitemapProvider, AzureStorageProvider],
})
export class SitemapModule {}
