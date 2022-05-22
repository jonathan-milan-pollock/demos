import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Metadata, PageType } from '@dark-rush-photography/website/types';
import { getMetadataForPageType } from './metadata.functions';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  constructor(private readonly title: Title, private readonly meta: Meta) {}

  setMetadataForPageType$(pageType: PageType, url: string): void {
    this.setMetadata$(getMetadataForPageType(pageType), url);
  }

  setMetadata$(metadata: Metadata, url: string): void {
    if (!metadata.title) {
      throw new Error('Title of metadata is required');
    }

    if (!metadata.seoDescription) {
      throw new Error('SEO Description of metadata is required');
    }

    // TODO:  <link rel="canonical" href={pageUrl} />
    if (metadata.title && metadata.seoDescription) {
      this.title.setTitle(metadata.title);
      this.meta.updateTag({
        name: 'description',
        content: metadata.seoDescription,
      });
      this.meta.updateTag({
        name: 'og:title',
        content: metadata.title,
      });
      this.meta.updateTag({
        name: 'og:description',
        content: metadata.seoDescription,
      });
      this.meta.updateTag({
        name: 'og:url',
        content: `https://darkrushphotography.com${url}`,
      });
    }
  }
}
