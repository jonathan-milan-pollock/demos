import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Metadata, PageType } from '@dark-rush-photography/website/types';
import { getMetadata } from './seo.functions';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private titleService: Title, private metaService: Meta) {}

  addMetadataForPage(pageType: PageType, url: string): void {
    const metadata = getMetadata(pageType, url);
    if (metadata) this.addMetadata(metadata);
  }

  addMetadata(metadata: Metadata): void {
    const {title, description, url} = metadata;
    if (title && description) {
      this.titleService.setTitle(title);
      this.metaService.addTags([
        {
          name: 'description',
          content: description,
        },
        {
          name: 'og:title',
          content: title,
        },
        {
          name: 'og:url',
          content: url,
        },
        {
          name: 'og:description',
          content: description,
        },
      ]);
    }
  }
}
