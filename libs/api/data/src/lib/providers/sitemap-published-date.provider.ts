import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import {
  Entity,
  EntityType,
  PublishedDateBestOfType,
  PublishedDatePathname,
} from '@dark-rush-photography/shared/types';
import { getBestOfTypeFromPathname } from '@dark-rush-photography/shared/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findAllPublicEntities$ } from '../entities/entity-repository.functions';

@Injectable()
export class SitemapPublishedDateProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  loadEventPublishedDates$(): Observable<PublishedDatePathname[]> {
    return findAllPublicEntities$(EntityType.Event, this.entityModel).pipe(
      map((publicEventEntities) =>
        publicEventEntities.map((publicEventEntity) => {
          const publishedDate = publicEventEntity.publishedDate;
          if (!publishedDate)
            throw new ConflictException(
              `Public event ${publicEventEntity.group} ${publicEventEntity.pathname} has an undefined published date`
            );

          return {
            publishedDate,
            pathname: publicEventEntity.pathname,
          };
        })
      )
    );
  }

  loadBestOfPublishedDates = (
    bestOfEntities: Entity[]
  ): PublishedDateBestOfType[] => {
    return bestOfEntities.map((bestOfEntity) => {
      const publishedDate = bestOfEntity.publishedDate;
      if (!publishedDate)
        throw new ConflictException(
          `Best of type entity ${bestOfEntity.pathname} has an undefined published date`
        );

      return {
        publishedDate,
        bestOfType: getBestOfTypeFromPathname(bestOfEntity.pathname),
      };
    });
  };
}
