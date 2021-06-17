import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
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
        if (documentModel)
          throw new ConflictException(
            `Favorites has already been created`,
            HttpStatus.FOUND
          );

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

  delete$(id: string): Observable<void> {
    return from(this.favoritesModel.findByIdAndDelete(id)).pipe(
      mapTo(undefined)
    );
  }
}
