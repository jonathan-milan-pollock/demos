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
  findDarkRushPhotographySitemap$(): Observable<string> {
    return this.sitemapsService.darkRushPhotographySitemap$();
  }

  @Get('37-photos')
  @ApiOkResponse({ type: String })
  findSitemap$(): Observable<string> {
    return this.sitemapsService.thirtySevenPhotosSitemap$();
  }
}
