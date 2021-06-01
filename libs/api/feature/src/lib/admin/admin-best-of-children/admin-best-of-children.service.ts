import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ENV,
  ImageDimensionType,
  BestOfChildren,
} from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';
import {
  azureStorageImageNames$,
  dataUriForAzureBlob$,
} from '@dark-rush-photography/api/data';
import { DocumentModel, Document } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminBestOfChildrenService {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @InjectModel(Document.name)
    private readonly bestOfChildrenModel: Model<DocumentModel>
  ) {}

  addBestOfChildren(
    bestOfChildren: BestOfChildren
  ): Observable<BestOfChildren> {
    return of(new this.bestOfChildrenModel(bestOfChildren)).pipe(
      switchMap((d) => d.save())
    );
  }

  updateBestOfChildren(
    id: string,
    bestOfChildren: BestOfChildren
  ): Observable<BestOfChildren> {
    return from(this.bestOfChildrenModel.findById(id)).pipe(
      tap((b) => {
        if (!b) {
          throw new NotFoundException('Could not find best of children');
        }
      }),
      switchMap(() =>
        this.bestOfChildrenModel.findByIdAndUpdate(id, bestOfChildren)
      ),
      map((b) => b as BestOfChildren)
    );
  }

  getImages(dimensionType: ImageDimensionType): Observable<string[]> {
    return azureStorageImageNames$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/bestof/children/best37/${dimensionType.toLowerCase()}`
    );
  }

  getImage(
    slug: string,
    dimensionType: ImageDimensionType
  ): Observable<string> {
    return dataUriForAzureBlob$(
      this.env.azureStorageConnectionString,
      'private',
      `resized-image/bestof/children/best37/${dimensionType.toLowerCase()}/${slug.toLowerCase()}.jpg`
    );
  }

  deleteBestOfChildren(id: string): Observable<void> {
    return of(this.bestOfChildrenModel.findByIdAndDelete(id)).pipe(
      map(() => undefined)
    );
  }
}
