import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Public } from '@dark-rush-photography/shared-server/util';
import { SitemapService } from './sitemap.service';

@Controller({ path: 'reviews', version: '1' })
@Public()
@ApiTags('Public Sitemap')
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) {}

  @Get('sitemap')
  @ApiOkResponse({ type: String })
  findSitemap$(): Observable<string> {
    return this.sitemapService.findSitemap$();
  }
}
