import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { from, iif, Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';

import { DocumentType, Favorites } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  FavoritesProvider,
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly favoritesProvider: FavoritesProvider,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  create$(): Observable<Favorites> {
    return from(
      this.favoritesModel.findOne({ type: DocumentType.Favorites })
    ).pipe(
      switchMap((documentModel) =>
        iif(
          () => documentModel !== null,
          of(documentModel),
          from(
            new this.favoritesModel(
              this.favoritesProvider.newFavorites()
            ).save()
          )
        )
      ),
      map(this.documentModelProvider.validateCreate),
      map(this.favoritesProvider.fromDocumentModel)
    );
  }

  findOne$(): Observable<Favorites> {
    return from(
      this.favoritesModel.find({ type: DocumentType.Favorites })
    ).pipe(
      map(this.documentModelProvider.validateOne),
      map(this.favoritesProvider.fromDocumentModel)
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.favoritesModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
