import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { EntityType, FavoritesDto } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  FavoritesProvider,
  validateOneEntity,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly favoritesProvider: FavoritesProvider
  ) {}

  findOne$(): Observable<FavoritesDto> {
    return this.entityProvider
      .findAllPublic$(EntityType.Favorites, this.favoritesModel)
      .pipe(
        toArray<DocumentModel>(),
        map(validateOneEntity),
        map(this.favoritesProvider.loadFavoritesPublic)
      );
  }
}
