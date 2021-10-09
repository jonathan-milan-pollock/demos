import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  DatePublishedSitemapEntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findAllPublicEntities$ } from '../entities/entity-repository.functions';
import { getEntityTypeFromSitemapEntityType } from '@dark-rush-photography/api/util';

@Injectable()
export class SitemapLoadMaxDatePublishedProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  loadMaxDatePublishedEntityType(
    sitemapEntityType: SitemapEntityType
  ): Observable<DatePublishedSitemapEntityType> {
    return findAllPublicEntities$(
      getEntityTypeFromSitemapEntityType(sitemapEntityType),
      this.entityModel
    ).pipe(
      map((entities) => {
        if (entities.length === 0) return new Date().toISOString();

        const minDate = new Date(-8640000000000000).toISOString();
        const datesPublished = entities.map(
          (entity) => entity.datePublished ?? minDate
        );

        const maxDatePublished = datesPublished.reduce(function (a, b) {
          return a > b ? a : b;
        });
        return maxDatePublished;
      }),
      map((maxDatePublished) => ({
        datePublished: maxDatePublished,
        sitemapEntityType,
      }))
    );
  }
}
