import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, Favorites } from '@dark-rush-photography/shared/types';
import {
  DocumentModel,
  Document,
  EntityProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityProvider: EntityProvider
  ) {}

  findOne$(): Observable<Favorites> {
    return this.entityProvider
      .findAllPublic$(EntityType.Favorites, this.favoritesModel)
      .pipe(map(this.entityProvider.validateOne)) as Observable<Favorites>;
  }
}
