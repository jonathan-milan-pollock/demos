import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { ImageOrders } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImageOrder$ } from '../images/image-repository.functions';

@Injectable()
export class ImageOrderProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  orderImages$(entityId: string, imageOrders: ImageOrders): Observable<void> {
    if (imageOrders.imageIdOrders.length === 0) return of(undefined);

    return from(imageOrders.imageIdOrders).pipe(
      concatMap((imageIdOrder) =>
        findEntityById$(entityId, this.entityModel).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            const foundImage = documentModel.images.find(
              (image) => image.id === imageIdOrder.imageId
            );
            if (!foundImage) return of(undefined);

            return updateImageOrder$(
              foundImage,
              imageIdOrder.order,
              documentModel,
              this.entityModel
            );
          })
        )
      ),
      last(),
      map(() => undefined)
    );
  }
}
