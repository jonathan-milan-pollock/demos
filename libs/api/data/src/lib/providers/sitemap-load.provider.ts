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
  DatePublishedSitemapEntityType,
  EntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';
import { getBestOfTypeFromSlug } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findAllPublicEntities$ } from '../entities/entity-repository.functions';
import { SitemapLoadXmlProvider } from './sitemap-load-xml.provider';
import { SitemapLoadMaxDatePublishedProvider } from './sitemap-load-max-date-published.provider';

@Injectable()
export class SitemapLoadProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly sitemapLoadMaxDatePublishedProvider: SitemapLoadMaxDatePublishedProvider,
    private readonly sitemapXmlProvider: SitemapLoadXmlProvider
  ) {}

  loadDarkRushPhotographySitemap$(): Observable<string> {
    return forkJoin([
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.Favorites
      ),
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.Event
      ),
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.About
      ),
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.Review
      ),
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.PhotoOfTheWeek
      ),
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.Destination
      ),
      this.sitemapLoadMaxDatePublishedProvider.loadMaxDatePublishedEntityType(
        SitemapEntityType.ReviewMedia
      ),
    ]).pipe(
      mergeMap(
        (datePublishedSitemapEntityTypes) => datePublishedSitemapEntityTypes
      ),
      toArray<DatePublishedSitemapEntityType>(),
      concatMap((datePublishedSitemapEntityTypes) =>
        combineLatest([
          of(datePublishedSitemapEntityTypes),
          findAllPublicEntities$(EntityType.Event, this.entityModel),
        ])
      ),
      map(([datePublishedSitemapEntityTypes, publicEventEntities]) =>
        this.sitemapXmlProvider.loadDarkRushPhotographySitemapXml(
          datePublishedSitemapEntityTypes,
          publicEventEntities
        )
      )
    );
  }

  loadThirtySevenPhotosSitemap$(): Observable<string> {
    return findAllPublicEntities$(EntityType.BestOf, this.entityModel).pipe(
      map((bestOfEntities) =>
        bestOfEntities.map((bestOfEntity) => ({
          datePublished: bestOfEntity.datePublished,
          bestOfType: getBestOfTypeFromSlug(bestOfEntity.slug),
        }))
      ),
      map((datePublishedBestOfTypes) =>
        this.sitemapXmlProvider.loadThirtySevenPhotosSitemapXml(
          datePublishedBestOfTypes
        )
      )
    );
  }
}
