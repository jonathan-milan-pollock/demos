import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  MaxPublishedDateSitemapEntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeFromSitemapEntityType } from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findAllPublicEntities$ } from '../entities/entity-repository.functions';

@Injectable()
export class SitemapMaxPublishedDateProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findMaxPublishedDate$(
    sitemapEntityType: SitemapEntityType
  ): Observable<MaxPublishedDateSitemapEntityType> {
    return findAllPublicEntities$(
      getEntityTypeFromSitemapEntityType(sitemapEntityType),
      this.entityModel
    ).pipe(
      map((documentModels) => {
        if (documentModels.length === 0) {
          throw new ConflictException(
            `Can not find entities of sitemap entity type ${sitemapEntityType}`
          );
        }

        const entitiesWithoutPublishedDate = documentModels.filter(
          (documentModel) => !documentModel.publishedDate
        );
        if (entitiesWithoutPublishedDate.length > 0) {
          throw new ConflictException(
            `Entities of sitemap entity type ${sitemapEntityType} have undefined published dates`
          );
        }

        return documentModels
          .map((documentModel) =>
            documentModel.publishedDate
              ? new Date(documentModel.publishedDate)
              : new Date(-8640000000000000)
          )
          .reduce(function (publishedDateA, publishedDateB) {
            return publishedDateA > publishedDateB
              ? publishedDateA
              : publishedDateB;
          });
      }),
      map((maxPublishedDate) => ({
        maxPublishedDate: maxPublishedDate.toISOString(),
        sitemapEntityType,
      }))
    );
  }
}
