import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  combineLatest,
  concatMap,
  from,
  map,
  Observable,
  of,
  pluck,
  tap,
} from 'rxjs';
import { Model } from 'mongoose';
import { drive_v3, GoogleApis } from 'googleapis';

import {
  EntityType,
  GoogleDriveFolder,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import {
  validateEntityFound,
  validateEntityNotPublishing,
  validateEntityType,
} from '../entities/entity-validation.functions';
import { ImageUpdateProvider } from './image-update.provider';
import {
  getExifDate,
  getGoogleDrive,
  findGoogleDriveFolderByName$,
  getGoogleDriveImageFiles$,
} from '@dark-rush-photography/api/util';
import { ConfigProvider } from './config.provider';

@Injectable()
export class EntityPublishProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageUpdateProvider: ImageUpdateProvider
  ) {}

  publish$(
    entityType: EntityType,
    documentModel: DocumentModel,
    renameMediaWithEntitySlug: boolean
  ): Observable<void> {
    return of(documentModel).pipe(
      map(validateEntityNotPublishing),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(documentModel._id, {
            isPublishing: true,
          })
        )
      ),
      map(() => undefined)
    );
    /*

      // TODO: validate for each entity

      concatMap((documentModel) =>
        combineLatest([
          from(
          ),
          of(documentModel),
        ])
      ),
      concatMap(() =>
        from(this.entityModel.findByIdAndUpdate(entityId, { isPublishing: false }))
      ),
      map(() => undefined)
      //concatMap(([video, documentModel]) =>
      //  this.videoProvider.update$(
      //    video,
      //    {
      //      fileName: `${documentModel.slug}${path.extname(video.fileName)}`,
      //    },
      //    documentModel,
      //    entityModel
      //  )
      //),*/
  }
}
