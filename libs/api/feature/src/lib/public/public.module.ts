import { Module } from '@nestjs/common';

import { EntitiesModule } from './entities/entities.module';
import { SitemapModule } from './sitemap/sitemap.module';

@Module({
  imports: [EntitiesModule, SitemapModule],
})
export class PublicModule {}
