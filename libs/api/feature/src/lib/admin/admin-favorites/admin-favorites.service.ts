import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, Favorites } from '@dark-rush-photography/shared/types';
import { DEFAULT_ENTITY_GROUP } from '@dark-rush-photography/shared-server/types';
import { FAVORITES_SLUG } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  create$(): Observable<Favorites> {
    return this.entityProvider.create$(
      EntityType.Favorites,
      DEFAULT_ENTITY_GROUP,
      FAVORITES_SLUG,
      this.favoritesModel
    ) as Observable<Favorites>;
  }

  findOne$(): Observable<Favorites> {
    return this.entityProvider
      .findAll$(EntityType.Favorites, this.favoritesModel)
      .pipe(
        map(this.entityProvider.validateOneEntity)
      ) as Observable<Favorites>;
  }

  delete$(id: string): Observable<void> {
    return this.entityProvider.delete$(
      EntityType.Favorites,
      id,
      this.favoritesModel
    );
  }
}
