import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { EntityType, Favorites } from '@dark-rush-photography/shared/types';
import { FAVORITES_SLUG } from '@dark-rush-photography/shared-server/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  ServerlessEntityProvider,
} from '@dark-rush-photography/api/data';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly serverlessEntityProvider: ServerlessEntityProvider
  ) {}

  create$(): Observable<Favorites> {
    return this.entityProvider.create$(
      EntityType.Favorites,
      FAVORITES_SLUG,
      this.favoritesModel
    ) as Observable<Favorites>;
  }

  findOne$(): Observable<Favorites> {
    return this.entityProvider
      .findAll$(EntityType.Favorites, this.favoritesModel)
      .pipe(map(this.entityProvider.validateOne)) as Observable<Favorites>;
  }

  deleteProcess$(id: string): Observable<void> {
    return this.serverlessEntityProvider.deleteProcess$(
      EntityType.Favorites,
      id,
      this.favoritesModel
    );
  }
}
