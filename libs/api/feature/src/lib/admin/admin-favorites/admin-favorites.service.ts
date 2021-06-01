import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ENV,
  ImageDimensionType,
  Favorites,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  azureStorageImageNames$,
  dataUriForAzureBlob$,
} from '@dark-rush-photography/api/data';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>
  ) {}

  addFavorites(favorites: Favorites): Observable<Favorites> {
    return of(new this.favoritesModel(favorites)).pipe(
      switchMap((d) => d.save())
    );
  }

  updateFavorites(id: string, favorites: Favorites): Observable<Favorites> {
    return from(this.favoritesModel.findById(id)).pipe(
      tap((f) => {
        if (!f) {
          throw new NotFoundException('Could not find favorites');
        }
      }),
      switchMap(() => this.favoritesModel.findByIdAndUpdate(id, favorites)),
      map((b) => b as Favorites)
    );
  }

  getImages(dimensionType: ImageDimensionType): Observable<string[]> {
    return azureStorageImageNames$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/favorites/best37/${dimensionType.toLowerCase()}`
    );
  }

  getImage(
    slug: string,
    dimensionType: ImageDimensionType
  ): Observable<string> {
    return dataUriForAzureBlob$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/favorites/best37/${dimensionType.toLowerCase()}/${slug.toLowerCase()}.jpg`
    );
  }

  deleteFavorites(id: string): Observable<void> {
    return of(this.favoritesModel.findByIdAndDelete(id)).pipe(
      map(() => undefined)
    );
  }
}
