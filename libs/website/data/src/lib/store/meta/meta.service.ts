import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Metadata, Page } from '@dark-rush-photography/website/types';
import { EMPTY, Observable } from 'rxjs';
import { getMetadata } from './meta.functions';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(private readonly title: Title, private readonly meta: Meta) {}

  addMetadataForPage$(page: Page, url: string): Observable<void> {
    this.addMetadata$(getMetadata(page), url);
    return EMPTY;
  }

  addMetadata$(metadata: Metadata | undefined, url: string): Observable<void> {
    if (!metadata) return EMPTY;

    const { title, description } = metadata;

    // TODO:  <link key={uuidv1()} rel="canonical" href={pageUrl} />
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

    return EMPTY;
  }
}
