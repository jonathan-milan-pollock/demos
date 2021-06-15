import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import {
  ImageDimensionType,
  ImageDimensionData,
} from '@dark-rush-photography/shared-types';
import {
  Document,
  DocumentModel,
  ImageDimensionDataProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImageDimensionDataService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>,
    private readonly imageDimensionDataProvider: ImageDimensionDataProvider
  ) {}

  find$(
    id: string,
    imageDimensionType: ImageDimensionType
  ): Observable<ImageDimensionData[]> {
    return from(this.documentModel.findById(id).exec()).pipe(
      map((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity');
        return {
          type: documentModel.type,
          images: documentModel.images,
        };
      }),
      switchMap(({ type, images }) => {
        return this.imageDimensionDataProvider.findImagesData$(
          type,
          imageDimensionType,
          images
        );
      })
    );
  }
}
