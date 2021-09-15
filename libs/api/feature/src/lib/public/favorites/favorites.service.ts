import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable, toArray } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityPublicProvider,
  FavoritesProvider,
  validateOneEntityFound,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityProvider: EntityPublicProvider,
    private readonly favoritesProvider: FavoritesProvider
  ) {}

  findOne$(): Observable<FavoritesDto> {
    return this.entityProvider
      .findAllPublic$(EntityType.Favorites, this.favoritesModel)
      .pipe(
        toArray<DocumentModel>(),
        map(validateOneEntityFound),
        map(this.favoritesProvider.loadFavoritesPublic)
      );
  }
}
