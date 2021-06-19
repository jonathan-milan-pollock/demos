import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, toArray } from 'rxjs/operators';
import { Model } from 'mongoose';

import { DocumentType, Favorites } from '@dark-rush-photography/shared-types';
import {
  DocumentModel,
  Document,
  FavoritesProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>,
    private readonly favoritesProvider: FavoritesProvider
  ) {}

  create$(): Observable<Favorites> {
    return from(
      this.favoritesModel.findOne({ type: DocumentType.Favorites })
    ).pipe(
      switchMap((documentModel) => {
        if (documentModel) return of(documentModel);

        return from(
          new this.favoritesModel({
            type: DocumentType.Favorites,
            slug: 'best-37',
            isPublic: true,
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
            comments: [],
            emotions: [],
          } as Favorites).save()
        );
      }),
      map((documentModel: DocumentModel) => {
        if (!documentModel) {
          throw new BadRequestException(`Unable to create favorites`);
        }
        return this.favoritesProvider.fromDocumentModel(documentModel);
      })
    );
  }

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
          throw new NotFoundException('Could not find Favorites');

        return this.favoritesProvider.fromDocumentModel(documentModel);
      })
    );
  }

  delete$(id: string): Observable<void> {
    return from(this.favoritesModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
