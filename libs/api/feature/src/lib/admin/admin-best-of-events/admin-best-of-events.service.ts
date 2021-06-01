import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ENV,
  ImageDimensionType,
  BestOfEvents,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  azureStorageImageNames$,
  dataUriForAzureBlob$,
} from '@dark-rush-photography/api/data';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfEventsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly bestOfEventsModel: Model<DocumentModel>
  ) {}

  addBestOfEvents(bestOfEvents: BestOfEvents): Observable<BestOfEvents> {
    return of(new this.bestOfEventsModel(bestOfEvents)).pipe(
      switchMap((d) => d.save())
    );
  }

  updateBestOfEvents(
    id: string,
    bestOfEvents: BestOfEvents
  ): Observable<BestOfEvents> {
    return from(this.bestOfEventsModel.findById(id)).pipe(
      tap((b) => {
        if (!b) {
          throw new NotFoundException('Could not find best of events');
        }
      }),
      switchMap(() =>
        this.bestOfEventsModel.findByIdAndUpdate(id, bestOfEvents)
      ),
      map((b) => b as BestOfEvents)
    );
  }

  getImages(dimensionType: ImageDimensionType): Observable<string[]> {
    return azureStorageImageNames$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/bestof/events/best37/${dimensionType.toLowerCase()}`
    );
  }

  getImage(
    slug: string,
    dimensionType: ImageDimensionType
  ): Observable<string> {
    return dataUriForAzureBlob$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/bestof/events/best37/${dimensionType.toLowerCase()}/${slug.toLowerCase()}.jpg`
    );
  }

  deleteBestOfEvents(id: string): Observable<void> {
    return of(this.bestOfEventsModel.findByIdAndDelete(id)).pipe(
      map(() => undefined)
    );
  }
}
