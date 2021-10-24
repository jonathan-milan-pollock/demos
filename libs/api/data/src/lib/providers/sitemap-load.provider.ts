import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { Model } from 'mongoose';

import {
  PublishedDateSitemapEntityType,
  EntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';

import { Document, DocumentModel } from '../schema/document.schema';
import { findAllPublicEntities$ } from '../entities/entity-repository.functions';
import { SitemapLoadXmlProvider } from './sitemap-load-xml.provider';
import { SitemapLoadMaxPublishedDateProvider } from './sitemap-load-max-date-published.provider';
import { getBestOfTypeFromSlug } from '@dark-rush-photography/shared/util';

@Injectable()
export class SitemapLoadProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly sitemapLoadMaxPublishedDateProvider: SitemapLoadMaxPublishedDateProvider,
    private readonly sitemapXmlProvider: SitemapLoadXmlProvider
  ) {}

  loadDarkRushPhotographySitemap$(): Observable<string> {
    return forkJoin([
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.Favorites
      ),
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.Event
      ),
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.About
      ),
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.Review
      ),
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.PhotoOfTheWeek
      ),
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.Destination
      ),
      this.sitemapLoadMaxPublishedDateProvider.loadMaxPublishedDateEntityType(
        SitemapEntityType.ReviewMedia
      ),
    ]).pipe(
      mergeMap(
        (publishedDateSitemapEntityTypes) => publishedDateSitemapEntityTypes
      ),
      toArray<PublishedDateSitemapEntityType>(),
      concatMap((publishedDateSitemapEntityTypes) =>
        combineLatest([
          of(publishedDateSitemapEntityTypes),
          findAllPublicEntities$(EntityType.Event, this.entityModel),
        ])
      ),
      map(([publishedDateSitemapEntityTypes, publicEventEntities]) =>
        this.sitemapXmlProvider.loadDarkRushPhotographySitemapXml(
          publishedDateSitemapEntityTypes,
          publicEventEntities
        )
      )
    );
  }

  loadThirtySevenPhotosSitemap$(): Observable<string> {
    return findAllPublicEntities$(EntityType.BestOf, this.entityModel).pipe(
      map((bestOfEntities) =>
        bestOfEntities.map((bestOfEntity) => ({
          publishedDate: bestOfEntity.publishedDate,
          bestOfType: getBestOfTypeFromSlug(bestOfEntity.slug),
        }))
      ),
      map((publishedDateBestOfTypes) =>
        this.sitemapXmlProvider.loadThirtySevenPhotosSitemapXml(
          publishedDateBestOfTypes
        )
      )
    );
  }
}
