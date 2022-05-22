import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import { GoogleDriveFile, Image } from '@dark-rush-photography/shared/types';
import { getOrderFromGoogleDriveImageFile } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  loadNewImage,
  loadAddImagePostImage,
  loadAddTestImage,
} from '../images/image-load-document-model.functions';
import { addImage$ } from '../images/image-repository.functions';
import { ImageAddBlobProvider } from './image-add-blob.provider';

@Injectable()
export class ImageAddProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddBlobProvider: ImageAddBlobProvider
  ) {}

  addNewImage$(
    googleDrive: drive_v3.Drive,
    newImageFile: GoogleDriveFile,
    entityId: string
  ): Observable<Image | undefined> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const newImage = loadNewImage(
          entityId,
          documentModel.slug,
          getOrderFromGoogleDriveImageFile(newImageFile.name)
        );

        return addImage$(
          newImage,
          entityId,
          documentModel,
          this.entityModel
        ).pipe(
          concatMap(() =>
            this.imageAddBlobProvider.addNewImageBlob$(
              googleDrive,
              newImageFile,
              newImage
            )
          ),
          map(() => newImage)
        );
      })
    );
  }

  addImagePostImage$(
    entityId: string,
    file: Express.Multer.File
  ): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const imagePostImage = loadAddImagePostImage(
          entityId,
          documentModel.slug
        );
        return addImage$(
          imagePostImage,
          entityId,
          documentModel,
          this.entityModel
        ).pipe(
          concatMap(() =>
            this.imageAddBlobProvider.addImagePostImageBlob$(
              imagePostImage,
              file
            )
          )
        );
      })
    );
  }

  addTestImage$(entityId: string): Observable<Image> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const testImage = loadAddTestImage(entityId, documentModel.slug);
        return addImage$(
          testImage,
          entityId,
          documentModel,
          this.entityModel
        ).pipe(map(() => testImage));
      })
    );
  }
}
