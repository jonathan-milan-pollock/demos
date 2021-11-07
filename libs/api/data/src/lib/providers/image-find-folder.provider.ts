import { Injectable } from '@nestjs/common';

import { concatMap, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import { getEntityTypeNewImagesFolderName } from '@dark-rush-photography/shared/util';
import {
  findGoogleDriveFolderById$,
  findGoogleDriveFolderByName$,
} from '@dark-rush-photography/api/util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateEntityGoogleDriveFolderId } from '../entities/entity-field-validation.functions';

@Injectable()
export class ImageFindFolderProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<GoogleDriveFolder | undefined> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const googleDriveFolderId =
          validateEntityGoogleDriveFolderId(documentModel);

        const newImagesFolderName = getEntityTypeNewImagesFolderName(
          documentModel.type
        );
        if (newImagesFolderName) {
          return findGoogleDriveFolderByName$(
            googleDrive,
            newImagesFolderName,
            googleDriveFolderId
          );
        } else {
          return findGoogleDriveFolderById$(googleDrive, googleDriveFolderId);
        }
      })
    );
  }
}
