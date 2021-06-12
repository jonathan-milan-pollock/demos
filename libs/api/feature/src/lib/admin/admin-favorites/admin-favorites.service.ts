import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { ENV, Favorites } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminFavoritesService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly favoritesModel: Model<DocumentModel>
  ) {}

  create(favorites: Favorites): Observable<Favorites> {
    return of(new this.favoritesModel(favorites)).pipe(
      switchMap((d) => d.save())
    );
  }

  update(id: string, favorites: Favorites): Observable<Favorites> {
    return from(this.favoritesModel.findById(id)).pipe(
      tap((f) => {
        if (!f) {
          throw new NotFoundException('Could not find favorites');
        }
      }),
      //switchMap(() => this.favoritesModel.findByIdAndUpdate(id, favorites)),
      map((b) => b as Favorites)
    );
  }

  delete(id: string): Observable<void> {
    return of(this.favoritesModel.findByIdAndDelete(id)).pipe(
      map(() => undefined)
    );
  }
}
