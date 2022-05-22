import { Module } from '@nestjs/common';

import { EntitiesModule } from './entities/entities.module';
import { SitemapsModule } from './sitemaps/sitemaps.module';

@Module({
  imports: [EntitiesModule, SitemapsModule],
})
export class PublicModule {}
