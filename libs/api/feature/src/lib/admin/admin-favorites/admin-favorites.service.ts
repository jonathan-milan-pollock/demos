import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { concatMapTo, from, map, Observable, toArray } from 'rxjs';

import { EntityType, Favorites } from '@dark-rush-photography/shared/types';
import {
  DEFAULT_ENTITY_GROUP,
  FAVORITES_SLUG,
} from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityDeleteProvider,
  FavoritesProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly entityProvider: EntityProvider,
    private readonly entityDeleteProvider: EntityDeleteProvider
  ) {}

  create$(): Observable<Favorites> {
    return this.entityProvider
      .create$(
        EntityType.Favorites,
        DEFAULT_ENTITY_GROUP,
        FAVORITES_SLUG,
        this.favoritesModel
      )
      .pipe(
        concatMapTo(
          from(
            new this.favoritesModel({
              ...this.favoritesProvider.loadNewFavorites(),
              type: EntityType.Favorites,
              isPublic: true,
            }).save()
          )
        ),
        map(this.entityProvider.validateEntityCreate),
        map(this.favoritesProvider.loadFavorites)
      );
  }

  findOne$(): Observable<Favorites> {
    return this.entityProvider
      .findAll$(EntityType.Favorites, this.favoritesModel)
      .pipe(
        toArray<DocumentModel>(),
        map(this.entityProvider.validateOneEntity),
        map(this.favoritesProvider.loadFavorites)
      );
  }

  delete$(id: string): Observable<void> {
    return from(this.favoritesModel.findById(id)).pipe(
      map(this.entityProvider.validateEntityFound),
      map(this.entityProvider.validateNotProcessingEntity),
      concatMapTo(
        this.entityProvider.setIsProcessing$(
          EntityType.Favorites,
          id,
          true,
          this.favoritesModel
        )
      ),
      concatMapTo(
        this.entityDeleteProvider.delete$(
          EntityType.Favorites,
          id,
          this.favoritesModel
        )
      )
    );
  }
}
