import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Metadata } from '@dark-rush-photography/shared-types';
import { PageType } from '@dark-rush-photography/website/types';
import { getMetadata } from './meta.functions';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private title: Title, private meta: Meta) {}

  addMetadataForPage(pageType: PageType, url: string): void {
    const metadata = getMetadata(pageType, url);
    if (metadata) this.addMetadata(metadata, url);
  }

  addMetadata(metadata: Metadata, url: string): void {
    const { title, description } = metadata;

    if (title && description) {
      this.title.setTitle(title);
      this.meta.addTags([
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
