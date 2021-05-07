import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Metadata, Page } from '@dark-rush-photography/website/types';
import { getMetadata } from './meta.functions';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private title: Title, private meta: Meta) {}

  addMetadataForPage(page: Page, url: string): void {
    this.addMetadata(getMetadata(page), url);
  }

  addMetadata(metadata: Metadata | undefined, url: string): void {
    if (!metadata) return;

    const { title, description } = metadata;

    if (title && description) {
      this.title.setTitle(title);
      this.meta.updateTag({
        name: 'description',
        content: description,
      });
      this.meta.updateTag({
        name: 'og:title',
        content: title,
      });
      this.meta.updateTag({
        name: 'og:description',
        content: description,
      });
      this.meta.updateTag({
        name: 'og:url',
        content: url,
      });
    }
  }
}
