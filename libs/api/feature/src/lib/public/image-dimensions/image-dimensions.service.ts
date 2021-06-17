import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Model } from 'mongoose';

import { ImageDimension } from '@dark-rush-photography/shared-types';
import {
  Document,
  DocumentModel,
  ImageDimensionProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class ImageDimensionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>,
    private readonly imageDimensionProvider: ImageDimensionProvider
  ) {}

  addOrUpdate$(imageDimension: ImageDimension): Observable<ImageDimension> {
    return from(
      this.documentModel.findById(imageDimension.entityId).exec()
    ).pipe(
      switchMap((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity');

        const image = documentModel.images.find(
          (i) => i.slug === imageDimension.imageSlug
        );

        if (!image)
          throw new NotFoundException(
            `Could not find image ${imageDimension.imageSlug}`
          );

        return from(
          this.documentModel.findByIdAndUpdate(image.entityId, {
            imageDimensions: [
              ...documentModel.imageDimensions.filter(
                (id) => id.imageSlug !== image.slug
              ),
              { ...imageDimension },
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new BadRequestException(
            `Unable to add image dimension to image ${imageDimension.imageSlug}`
          );
        }
        return this.imageDimensionProvider.toImageDimension(imageDimension);
      })
    );
  }
}
