import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageDimension } from '@dark-rush-photography/shared-types';
import { DocumentModel } from '../schema/document.schema';
import { toImageDimension } from '../functions/image-dimension.functions';

@Injectable()
export class ImageDimensionProvider {
  findById$(
    documentModel: Model<DocumentModel>,
    entityId: string,
    imageDimensionId: string
  ): Observable<ImageDimension> {
    return from(documentModel.findById(entityId).exec()).pipe(
      map((response) => {
        if (!response) throw new NotFoundException('Could not find entity');

        const foundImageDimension = response.imageDimensions.find(
          (id) => id.id === imageDimensionId
        );
        if (!foundImageDimension)
          throw new NotFoundException('Could not find image dimension by id');

        return toImageDimension(foundImageDimension);
      })
    );
  }
}
