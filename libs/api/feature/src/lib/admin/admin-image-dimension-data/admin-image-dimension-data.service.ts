import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  ImageDimensionType,
  ImageDimensionData,
} from '@dark-rush-photography/shared-types';
import { Document, DocumentModel } from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImageDimensionDataService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>,
    private readonly httpService: HttpService
  ) {}

  find$(
    id: string,
    imageDimensionType: ImageDimensionType
  ): Observable<ImageDimensionData[]> {
    return of();
    /*
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
    );*/
  }
}
