import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import {
  CronProcessType,
  EntityType,
  ImageAdmin,
  ImageOrders,
  ImageSelections,
  ImageState,
  ImageStates,
  ImageUpdate,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { updateImage$ } from '../images/image-repository.functions';
import { loadImageAdmin } from '../images/image-load.functions';
import {
  validateImageFound,
  validatePublishImage,
} from '../images/image-validation.functions';
import { startCronProcessType } from '../cron-processes/cron-process-start.functions';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageOrderProvider } from '../providers/image-order.provider';
import { ImageStateChangeProvider } from '../providers/image-state-change.provider';
import { ImageRemoveOneProvider } from '../providers/image-remove-one.provider';
import { CronProcessRepositoryProvider } from '../providers/cron-process-repository.provider';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddProvider: ImageAddProvider,
    private readonly imageOrderProvider: ImageOrderProvider,
    private readonly imageStateChangeProvider: ImageStateChangeProvider,
    private readonly imageRemoveOneProvider: ImageRemoveOneProvider,
    @Inject(CronProcessRepositoryProvider.name)
    private readonly cronProcessRepositoryProvider: CronProcessRepositoryProvider
  ) {}

  addTestImage$(entityId: string): Observable<ImageAdmin> {
    return this.imageAddProvider
      .addTestImage$(entityId)
      .pipe(map((image) => loadImageAdmin(image)));
  }

  loadImages$(
    entityId: string,
    imageStates: ImageStates
  ): Observable<ImageAdmin[]> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        documentModel.images
          .filter((image) => imageStates.imageStates.includes(image.state))
          .sort((imageA, imageB) => imageA.order - imageB.order)
          .map((image) => loadImageAdmin(image))
      )
    );
  }

  updateNewImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        if (documentModel.type === EntityType.Test) return of(undefined);

        return this.cronProcessRepositoryProvider.create$(
          startCronProcessType(
            CronProcessType.UpdateNewImages,
            documentModel.type,
            documentModel._id,
            documentModel.group,
            documentModel.pathname
          )
        );
      }),
      map(() => undefined)
    );
  }

  orderImages$(entityId: string, imageOrders: ImageOrders): Observable<void> {
    return this.imageOrderProvider.orderImages$(entityId, imageOrders);
  }

  selectNewImages$(
    entityId: string,
    imageSelections: ImageSelections
  ): Observable<void> {
    return this.imageStateChangeProvider.selectNewImages$(
      entityId,
      imageSelections
    );
  }

  updatePublishImage$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const image = validateImageFound(imageId, documentModel.images);
        return updateImage$(
          validatePublishImage(image),
          imageUpdate,
          documentModel,
          this.entityModel
        );
      }),
      map(() => undefined)
    );
  }

  archiveImage$(imageId: string, entityId: string): Observable<void> {
    return this.imageStateChangeProvider.archiveImage$(imageId, entityId);
  }

  unarchiveImage$(imageId: string, entityId: string): Observable<void> {
    return this.imageStateChangeProvider.unarchiveImage$(imageId, entityId);
  }

  removePublishImage$(imageId: string, entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        const image = documentModel.images.find(
          (image) => image.id === imageId
        );
        if (
          !image ||
          (image.state !== ImageState.Selected &&
            image.state !== ImageState.Public)
        ) {
          return of(undefined);
        }
        return this.imageRemoveOneProvider.removeImage$(image);
      })
    );
  }
}
