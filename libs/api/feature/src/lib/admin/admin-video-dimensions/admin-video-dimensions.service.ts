import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

import {
  ContentType,
  VideoDimension,
  VideoDimensionAdd,
  VideoDimensionData,
} from '@dark-rush-photography/shared/types';
import {
  ContentProvider,
  Document,
  DocumentModel,
  ServerlessMediaProvider,
} from '@dark-rush-photography/api/data';

@Injectable()
export class AdminVideoDimensionsService {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProvider: ContentProvider,
    private readonly serverlessMediaProvider: ServerlessMediaProvider
  ) {}

  add$(
    entityId: string,
    videoId: string,
    videoDimensionAdd: VideoDimensionAdd
  ): Observable<VideoDimension> {
    const id = uuidv4();
    return this.contentProvider
      .add$(
        ContentType.VideoDimension,
        entityId,
        this.entityModel,
        (documentModel) =>
          !!documentModel.videoDimensions.find(
            (videoDimension) =>
              videoDimension.videoId == videoId &&
              videoDimension.type === videoDimensionAdd.type
          ),
        (documentModel) => ({
          videoDimensions: [
            ...documentModel.videoDimensions,
            { ...videoDimensionAdd, id, entityId, videoId },
          ],
        })
      )
      .pipe(switchMapTo(this.findOne$(id, entityId)));
  }

  findOne$(id: string, entityId: string): Observable<VideoDimension> {
    return this.contentProvider
      .findOne$(ContentType.VideoDimension, id, entityId, this.entityModel)
      .pipe(
        map((documentModel) =>
          this.contentProvider.toVideoDimension(
            documentModel.videoDimensions.find(
              (videoDimension) => videoDimension.id == id
            )
          )
        )
      );
  }

  findDataUri$(id: string, entityId: string): Observable<VideoDimensionData> {
    return combineLatest([
      this.contentProvider.findOne$(
        ContentType.VideoDimension,
        id,
        entityId,
        this.entityModel
      ),
      this.findOne$(id, entityId),
    ]).pipe(
      switchMap(([documentModel, videoDimension]) =>
        this.serverlessMediaProvider.findDataUriVideo$(
          videoDimension.id,
          videoDimension.videoId,
          documentModel.type,
          entityId
        )
      )
    );
  }

  remove$(id: string, entityId: string): Observable<void> {
    return this.contentProvider.remove$(
      ContentType.VideoDimension,
      id,
      entityId,
      this.entityModel,
      (documentModel) => {
        return {
          videoDimensions: [
            ...documentModel.videoDimensions.filter(
              (videoDimension) => videoDimension.id !== id
            ),
          ],
        } as Partial<DocumentModel>;
      }
    );
  }
}
