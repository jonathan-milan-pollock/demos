import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { SitemapLoadProvider } from '../providers/sitemap-load.provider';

@Injectable()
export class SitemapsService {
  constructor(private readonly sitemapLoadProvider: SitemapLoadProvider) {}

  loadDarkRushPhotographySitemap$(): Observable<string> {
    return this.sitemapLoadProvider.loadDarkRushPhotographySitemap$();
  }

  loadThirtySevenPhotosSitemap$(): Observable<string> {
    return this.sitemapLoadProvider.loadThirtySevenPhotosSitemap$();
  }
}
