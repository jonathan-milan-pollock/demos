import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  PublishedDateSitemapEntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeFromSitemapEntityType } from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findAllPublicEntities$ } from '../entities/entity-repository.functions';

@Injectable()
export class SitemapLoadMaxPublishedDateProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  loadMaxPublishedDateEntityType(
    sitemapEntityType: SitemapEntityType
  ): Observable<PublishedDateSitemapEntityType> {
    return findAllPublicEntities$(
      getEntityTypeFromSitemapEntityType(sitemapEntityType),
      this.entityModel
    ).pipe(
      map((entities) => {
        if (entities.length === 0) return new Date().toISOString();

        const minDate = new Date(-8640000000000000).toISOString();
        const datesPublished = entities.map(
          (entity) => entity.publishedDate ?? minDate
        );

        const maxPublishedDate = datesPublished.reduce(function (a, b) {
          return a > b ? a : b;
        });
        return maxPublishedDate;
      }),
      map((maxPublishedDate) => ({
        publishedDate: maxPublishedDate,
        sitemapEntityType,
      }))
    );
  }
}
