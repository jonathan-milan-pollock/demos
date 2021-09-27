import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable } from 'rxjs';
import { Model } from 'mongoose';

import { EntityType } from '@dark-rush-photography/shared/types';
import { FavoritesDto } from '@dark-rush-photography/api/types';
import {
  DocumentModel,
  Document,
  EntityFindAllPublicProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly entityPublicProvider: EntityFindAllPublicProvider
  ) {}

  findOne$(): Observable<FavoritesDto> {
    return this.entityPublicProvider.findAllPublic$(
      EntityType.Favorites,
      this.favoritesModel
    );
  }
}
