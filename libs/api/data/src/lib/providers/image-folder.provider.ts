import { Injectable } from '@nestjs/common';

import { concatMap, from, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';

import { GoogleDriveFolder } from '@dark-rush-photography/shared/types';
import {
  findGoogleDriveFolderById$,
  findGoogleDriveFolderByName$,
  getEntityTypeNewImagesFolderName,
} from '@dark-rush-photography/api/util';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateEntityGoogleDriveFolderId } from '../entities/entity-field-validation.functions';

@Injectable()
export class ImageFolderProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findNewImagesFolder$(
    googleDrive: drive_v3.Drive,
    entityId: string
  ): Observable<GoogleDriveFolder | undefined> {
    return from(this.entityModel.findById(entityId)).pipe(
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
        }
        return findGoogleDriveFolderById$(googleDrive, googleDriveFolderId);
      })
    );
  }
}
