import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map, switchMap, toArray } from 'rxjs/operators';

import { DocumentType, Favorites } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  FavoritesProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly favoritesProvider: FavoritesProvider
  ) {}

  findAll$(): Observable<Favorites[]> {
    return from(
      this.favoritesModel.find({ type: DocumentType.Favorites }).exec()
    ).pipe(
      switchMap((documentModels) => from(documentModels)),
      map((documentModel) =>
        this.favoritesProvider.fromDocumentModel(documentModel)
      ),
      toArray<Favorites>()
    );
  }

  findOne$(id: string): Observable<Favorites> {
    return from(this.favoritesModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find favorites');

        return this.favoritesProvider.fromDocumentModel(documentModel);
      })
    );
  }
}
