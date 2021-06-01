import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ENV,
  ImageDimensionType,
  Destination,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  dataUriForAzureBlob$,
  azureStorageImageNames$,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminDestinationsService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly destinationModel: Model<DocumentModel>
  ) {}

  addDestination(destination: Destination): Observable<Destination> {
    return of(new this.destinationModel(destination)).pipe(
      switchMap((d) => d.save())
    );
  }

  updateDestination(
    id: string,
    destination: Destination
  ): Observable<Destination> {
    return from(this.destinationModel.findById(id)).pipe(
      tap((d) => {
        if (!d) {
          throw new NotFoundException('Could not find destination');
        }
      }),
      switchMap(() => this.destinationModel.findByIdAndUpdate(id, destination)),
      map((d) => d as Destination)
    );
  }

  getImages(dimensionType: string): Observable<string[]> {
    return azureStorageImageNames$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/BestOf/children/best37/${dimensionType.toLowerCase()}`
    );
  }

  getImage(
    slug: string,
    dimensionType: ImageDimensionType
  ): Observable<string> {
    return dataUriForAzureBlob$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/BestOf/children/best37/${dimensionType.toLowerCase()}/${slug.toLowerCase()}.jpg`
    );
  }

  deleteDestination(id: string): Observable<void> {
    return of(this.destinationModel.findByIdAndDelete(id)).pipe(
      map(() => undefined)
    );
  }
}
