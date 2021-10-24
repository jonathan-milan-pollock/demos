import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  map,
  max,
  Observable,
  of,
  take,
} from 'rxjs';
import { Model } from 'mongoose';

import {
  ImageAdmin,
  ImageOrders,
  ImageSelections,
  ImageState,
  ImageStates,
  ImageUpdate,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import {
  updateImage$,
  updateImageOrder$,
} from '../images/image-repository.functions';
import { loadImageAdmin } from '../images/image-load.functions';
import {
  validateImageFound,
  validatePublishImage,
} from '../images/image-validation.functions';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageStateChangeProvider } from '../providers/image-state-change.provider';
import { ImageRemoveOneProvider } from '../providers/image-remove-one.provider';
import { CronProcessStartProvider } from '../providers/cron-process-start.provider';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddProvider: ImageAddProvider,
    private readonly imageStateChangeProvider: ImageStateChangeProvider,
    private readonly imageRemoveOneProvider: ImageRemoveOneProvider,
    private readonly cronProcessStartProvider: CronProcessStartProvider
  ) {}

  addThreeSixtyImage$(
    entityId: string,
    threeSixtyImageAdd: ThreeSixtyImageAdd
  ): Observable<ImageAdmin> {
    return this.imageAddProvider
      .addThreeSixtyImage$(entityId, threeSixtyImageAdd)
      .pipe(map((image) => loadImageAdmin(image)));
  }

  load$(entityId: string, imageStates: ImageStates): Observable<ImageAdmin[]> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        documentModel.images
          .filter((image) => imageStates.states.includes(image.state))
          .map((image) => loadImageAdmin(image))
      ),
      map((images) =>
        images.sort((imageA, imageB) => imageA.order - imageB.order)
      )
    );
  }

  updateNewImages$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        this.cronProcessStartProvider.startUpdateNewImagesForEntity$(
          documentModel.type,
          documentModel._id,
          documentModel.group,
          documentModel.slug
        )
      ),
      map(() => undefined)
    );
  }

  orderPublishImages$(
    entityId: string,
    imageOrders: ImageOrders
  ): Observable<void> {
    if (imageOrders.imageIds.length === 0) return of(undefined);

    return from(imageOrders.imageIds).pipe(
      concatMap((imageId) =>
        findEntityById$(entityId, this.entityModel).pipe(
          map(validateEntityFound),
          concatMap((documentModel) => {
            if (documentModel.images.length === 0)
              return combineLatest([of(documentModel), of(0)]);

            return combineLatest([
              of(documentModel),
              from(
                documentModel.images
                  .filter(
                    (image) =>
                      image.state == ImageState.Selected ||
                      image.state == ImageState.Public
                  )
                  .map((image) => image.order)
              ).pipe(max(), take(1)),
            ]);
          }),
          concatMap(([documentModel, maxOrder]) => {
            const foundImage = documentModel.images.find(
              (image) => image.id === imageId
            );
            if (!foundImage) return of(undefined);

            return updateImageOrder$(
              foundImage,
              maxOrder + 1,
              documentModel,
              this.entityModel
            );
          })
        )
      ),
      map(() => undefined)
    );
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

  update$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const image = validateImageFound(imageId, documentModel);
        validatePublishImage(image);
        return updateImage$(
          image,
          imageUpdate,
          documentModel,
          this.entityModel
        );
      }),
      map(() => undefined)
    );
  }

  archive$(imageId: string, entityId: string): Observable<void> {
    return this.imageStateChangeProvider.archiveImage$(imageId, entityId);
  }

  unarchive$(imageId: string, entityId: string): Observable<void> {
    return this.imageStateChangeProvider.unarchiveImage$(imageId, entityId);
  }

  removePublishImage$(imageId: string, entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      concatMap((documentModel) => {
        if (!documentModel) return of(undefined);

        const image = documentModel.images.find(
          (image) => image.id === imageId
        );
        if (!image) return of(undefined);

        validatePublishImage(image);

        return this.imageRemoveOneProvider.removeImage$(image);
      })
    );
  }
}
