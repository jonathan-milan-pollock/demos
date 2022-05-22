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
  MaxPublishedDateSitemapEntityType,
  EntityType,
  SitemapEntityType,
  BestOfType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findOnePublicEntityForSlug$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { SitemapMaxPublishedDateProvider } from './sitemap-max-published-date.provider';
import { SitemapPublishedDateProvider } from './sitemap-published-date.provider';
import { SitemapXmlProvider } from './sitemap-xml.provider';

@Injectable()
export class SitemapLoadProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly sitemapMaxPublishedDateProvider: SitemapMaxPublishedDateProvider,
    private readonly sitemapPublishedDateProvider: SitemapPublishedDateProvider,
    private readonly sitemapXmlProvider: SitemapXmlProvider
  ) {}

  loadDarkRushPhotographySitemap$(): Observable<string> {
    return forkJoin([
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.Favorites
      ),
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.Event
      ),
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.About
      ),
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.Review
      ),
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.PhotoOfTheWeek
      ),
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.Destination
      ),
      this.sitemapMaxPublishedDateProvider.findMaxPublishedDate$(
        SitemapEntityType.ReviewMedia
      ),
    ]).pipe(
      mergeMap(
        (publishedDateSitemapEntityTypes) => publishedDateSitemapEntityTypes
      ),
      toArray<MaxPublishedDateSitemapEntityType>(),
      concatMap((publishedDateSitemapEntityTypes) =>
        combineLatest([
          of(publishedDateSitemapEntityTypes),
          this.sitemapPublishedDateProvider.loadEventPublishedDates$(),
        ])
      ),
      map(([publishedDateSitemapEntityTypes, eventPublishEventSlugs]) =>
        this.sitemapXmlProvider.loadDarkRushPhotographySitemapXml(
          publishedDateSitemapEntityTypes,
          eventPublishEventSlugs
        )
      )
    );
  }

  loadThirtySevenPhotosSitemap$(): Observable<string> {
    return forkJoin([
      findOnePublicEntityForSlug$(
        EntityType.BestOf,
        BestOfType.Events.toLowerCase(),
        this.entityModel
      ).pipe(map(validateEntityFound)),
      findOnePublicEntityForSlug$(
        EntityType.BestOf,
        BestOfType.RealEstate.toLowerCase(),
        this.entityModel
      ).pipe(map(validateEntityFound)),
      findOnePublicEntityForSlug$(
        EntityType.BestOf,
        BestOfType.Nature.toLowerCase(),
        this.entityModel
      ).pipe(map(validateEntityFound)),
      findOnePublicEntityForSlug$(
        EntityType.BestOf,
        BestOfType.Landscapes.toLowerCase(),
        this.entityModel
      ).pipe(map(validateEntityFound)),
      findOnePublicEntityForSlug$(
        EntityType.BestOf,
        BestOfType.Children.toLowerCase(),
        this.entityModel
      ).pipe(map(validateEntityFound)),
    ]).pipe(
      mergeMap((documentModels) => documentModels),
      toArray<DocumentModel>(),
      map((bestOfEntities) =>
        this.sitemapPublishedDateProvider.loadBestOfPublishedDates(
          bestOfEntities
        )
      ),
      map((publishedDateBestOfTypes) =>
        this.sitemapXmlProvider.loadThirtySevenPhotosSitemapXml(
          publishedDateBestOfTypes
        )
      )
    );
  }
}
