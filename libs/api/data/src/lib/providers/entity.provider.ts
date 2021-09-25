import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { combineLatest, concatMap, from, Observable, of, toArray } from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3 } from 'googleapis';

import {
  EntityType,
  WatermarkedType,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { loadDocumentModelsArray } from '../entities/entity.functions';
import { validateEntityGroupProvided } from '../entities/entity-validation.functions';
import { AboutProvider } from './about.provider';
import { BestOfProvider } from './best-of.provider';
import { DestinationProvider } from './destination.provider';
import { EventProvider } from './event.provider';
import { FavoritesProvider } from './favorites.provider';
import { PhotoOfTheWeekProvider } from './photo-of-the-week.provider';
import { ReviewMediaProvider } from './review-media.provider';
import { ReviewProvider } from './review.provider';
import { SocialMediaProvider } from './social-media.provider';

@Injectable()
export class EntityProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly aboutProvider: AboutProvider,
    private readonly bestOfProvider: BestOfProvider,
    private readonly destinationProvider: DestinationProvider,
    private readonly eventProvider: EventProvider,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly photoOfTheWeekProvider: PhotoOfTheWeekProvider,
    private readonly reviewMediaProvider: ReviewMediaProvider,
    private readonly reviewProvider: ReviewProvider,
    private readonly socialMediaProvider: SocialMediaProvider
  ) {}

  create$(
    googleDrive: drive_v3.Drive,
    entityType: EntityType,
    group?: string
  ): Observable<void> {
    switch (entityType) {
      case EntityType.About:
        return this.aboutProvider.create$(googleDrive);
      case EntityType.BestOf:
        return this.bestOfProvider.create$(googleDrive);
      case EntityType.Destination:
        return this.destinationProvider.create$(googleDrive);
      case EntityType.Event:
        return this.eventProvider.create$(
          googleDrive,
          validateEntityGroupProvided(group)
        );
      case EntityType.Favorites:
        return this.favoritesProvider.create$(googleDrive);
      case EntityType.ImagePost:
        return this.aboutProvider.create$(googleDrive);
      case EntityType.ImageVideo:
        return this.reviewProvider
          .create$(googleDrive, WatermarkedType.Watermarked)
          .pipe(
            concatMap(() =>
              this.reviewProvider.create$(
                googleDrive,
                WatermarkedType.WithoutWatermark
              )
            )
          );
      case EntityType.PhotoOfTheWeek:
        return this.photoOfTheWeekProvider.create$(
          googleDrive,
          validateEntityGroupProvided(group)
        );
      case EntityType.ReviewMedia:
        return this.reviewMediaProvider.create$(googleDrive);
      case EntityType.Review:
        return this.reviewProvider
          .create$(googleDrive, WatermarkedType.Watermarked)
          .pipe(
            concatMap(() =>
              this.reviewProvider.create$(
                googleDrive,
                WatermarkedType.WithoutWatermark
              )
            )
          );
      case EntityType.SocialMedia:
        return this.socialMediaProvider.create$(
          googleDrive,
          validateEntityGroupProvided(group)
        );
      default:
        return of(undefined);
    }
  }

  findAll$(entityType: EntityType): Observable<DocumentModel[]> {
    return of(entityType).pipe(
      concatMap(() =>
        combineLatest([
          this.entityModel.find({
            type: entityType,
            watermarkedType: WatermarkedType.Watermarked,
          }),
          this.entityModel.find({
            type: entityType,
            watermarkedType: WatermarkedType.WithoutWatermark,
          }),
        ])
      ),
      concatMap(([watermarkedImagePosts, withoutWatermarkImagePosts]) =>
        from([
          ...loadDocumentModelsArray(watermarkedImagePosts),
          ...loadDocumentModelsArray(withoutWatermarkImagePosts),
        ])
      ),
      toArray<DocumentModel>()
    );
  }
}
