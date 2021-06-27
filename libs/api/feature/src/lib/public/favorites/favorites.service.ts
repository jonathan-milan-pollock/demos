import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { EntityType, Favorites } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  FavoritesProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  findOne$(): Observable<Favorites> {
    return from(this.favoritesModel.find({ type: EntityType.Favorites })).pipe(
      map(this.documentModelProvider.validateOne),
      map(this.favoritesProvider.fromDocumentModelPublic)
    );
  }
}
