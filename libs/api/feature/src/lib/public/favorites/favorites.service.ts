import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { map, Observable, toArray } from 'rxjs';

import { EntityType, FavoritesDto } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
  EntityLoadProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider,
    private readonly entityLoadProvider: EntityLoadProvider
  ) {}

  findOne$(): Observable<FavoritesDto> {
    return this.entityProvider
      .findAllPublic$(EntityType.Favorites, this.favoritesModel)
      .pipe(
        toArray<DocumentModel>(),
        map(this.entityProvider.validateOneEntity),
        map(this.entityLoadProvider.loadFavoritesPublic)
      );
  }
}
