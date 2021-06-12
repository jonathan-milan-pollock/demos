import {
  ConflictException,
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
  DocumentModelProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImageDimensionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<DocumentModel>,
    private readonly documentModelProvider: DocumentModelProvider
  ) {}

  addOrUpdate$(imageDimension: ImageDimension): Observable<ImageDimension> {
    return from(
      this.documentModel.findById(imageDimension.entityId).exec()
    ).pipe(
      switchMap((documentModel) => {
        if (!documentModel)
          throw new NotFoundException('Could not find entity');

        const image = documentModel.images.find(
          (i) => i.slug !== imageDimension.imageSlug
        );
        if (!image)
          throw new NotFoundException(
            `Could not find image ${imageDimension.imageSlug}`
          );

        return from(
          this.documentModel.findByIdAndUpdate(imageDimension.entityId, {
            images: [
              ...documentModel.images.filter(
                (i) => i.slug !== imageDimension.imageSlug
              ),
              {
                ...image,
                dimensions: [
                  ...image.dimensions.filter(
                    (id) => id.type !== imageDimension.type
                  ),
                  { ...imageDimension },
                ],
              },
            ],
          })
        );
      }),
      map((response) => {
        if (!response) {
          throw new ConflictException(
            `Unable to add image dimension to image ${imageDimension.imageSlug}`
          );
        }
        return imageDimension;
      })
    );
  }
}
