import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { Public } from '@dark-rush-photography/api/util';
import { SitemapsService } from '@dark-rush-photography/api/data';

@Controller({ path: 'sitemaps', version: '1' })
@Public()
@ApiTags('Public Sitemaps')
export class SitemapsController {
  constructor(private readonly sitemapsService: SitemapsService) {}

  @Get('dark-rush-photography')
  @ApiOkResponse({ type: String })
  loadDarkRushPhotographySitemap$(): Observable<string> {
    return this.sitemapsService.loadDarkRushPhotographySitemap$();
  }

  @Get('thirty-seven-photos')
  @ApiOkResponse({ type: String })
  loadThirtySevenPhotosSitemap$(): Observable<string> {
    return this.sitemapsService.loadThirtySevenPhotosSitemap$();
  }
}
