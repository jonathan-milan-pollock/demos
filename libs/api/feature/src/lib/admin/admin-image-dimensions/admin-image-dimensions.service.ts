import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ContentType,
  ImageDimension,
  ImageDimensionAdd,
  ImageDimensionData,
  ThreeSixtyImageSettings,
} from '@dark-rush-photography/shared/types';
import {
  ContentProvider,
  Document,
  DocumentModel,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminImageDimensionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProvider: ContentProvider,
    private readonly serverlessMediaProvider: ServerlessMediaProvider
  ) {}

  add$(
    entityId: string,
    imageId: string,
    imageDimensionAdd: ImageDimensionAdd
  ): Observable<ImageDimension> {
    const id = uuidv4();
    return this.contentProvider
      .add$(
        ContentType.ImageDimension,
        entityId,
        this.entityModel,
        (documentModel) =>
          !!documentModel.imageDimensions.find(
            (imageDimension) =>
              imageDimension.imageId === imageId &&
              imageDimension.type === imageDimensionAdd.type
          ),
        (documentModel) => ({
          imageDimensions: [
            ...documentModel.imageDimensions,
            { ...imageDimensionAdd, id, entityId, imageId },
          ],
        })
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  updateThreeSixtyImageSettings$(
    id: string,
    entityId: string,
    threeSixtyImageSettings: ThreeSixtyImageSettings
  ): Observable<ImageDimension> {
    return this.contentProvider
      .update$(
        ContentType.ImageDimension,
        id,
        entityId,
        this.entityModel,
        (documentModel) => {
          const foundImageDimension = documentModel.imageDimensions.find(
            (imageDimension) => imageDimension.id == id
          );
          return {
            imageDimensions: [
              ...documentModel.imageDimensions.filter(
                (imageDimension) => imageDimension.id !== id
              ),
              {
                ...foundImageDimension,
                threeSixtyImageSettings: { ...threeSixtyImageSettings },
              },
            ],
          } as Partial<DocumentModel>;
        }
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  findOne$(id: string, entityId: string): Observable<ImageDimension> {
    return this.contentProvider
      .findOne$(ContentType.ImageDimension, id, entityId, this.entityModel)
      .pipe(
        map((documentModel) =>
          this.contentProvider.toImageDimension(
            documentModel.imageDimensions.find(
              (imageDimension) => imageDimension.id == id
            )
          )
        )
      );
  }

  findDataUri$(id: string, entityId: string): Observable<ImageDimensionData> {
    return combineLatest([
      this.contentProvider.findOne$(
        ContentType.ImageDimension,
        id,
        entityId,
        this.entityModel
      ),
      this.findOne$(id, entityId),
    ]).pipe(
      switchMap(([documentModel, imageDimension]) =>
        this.serverlessMediaProvider.findDataUriImage$(
          imageDimension.id,
          imageDimension.imageId,
          documentModel.type,
          entityId
        )
      )
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.contentProvider.remove$(
      ContentType.ImageDimension,
      id,
      entityId,
      this.entityModel,
      (documentModel) => {
        return {
          imageDimensions: [
            ...documentModel.imageDimensions.filter(
              (imageDimension) => imageDimension.id !== id
            ),
          ],
        } as Partial<DocumentModel>;
      }
    );
  }
}
