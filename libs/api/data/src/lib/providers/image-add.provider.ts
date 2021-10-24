import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, map, Observable, of } from 'rxjs';
import { drive_v3 } from 'googleapis';
import { Model } from 'mongoose';

import {
  GoogleDriveFile,
  Image,
  ImageState,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';
import { getOrderFromGoogleDriveImageFile } from '@dark-rush-photography/api/util';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';
import {
  loadNewImage,
  loadAddThreeSixtyImage,
  loadAddImagePostImage,
} from '../images/image-load-document-model.functions';
import { addImage$ } from '../images/image-repository.functions';
import { ImageAddBlobProvider } from './image-add-blob.provider';

@Injectable()
export class ImageAddProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageAddBlobProvider: ImageAddBlobProvider
  ) {
    this.logger = new Logger(ImageAddProvider.name);
  }

  addNewImage$(
    googleDrive: drive_v3.Drive,
    newImageFile: GoogleDriveFile,
    entityId: string
  ): Observable<Image | undefined> {
    this.logger.log(`Adding new image ${newImageFile.name}`);

    const newImage = loadNewImage(
      entityId,
      newImageFile.name,
      getOrderFromGoogleDriveImageFile(newImageFile.name)
    );

    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        const existingNewImage = documentModel.images.find(
          (image) =>
            image.state === ImageState.New &&
            image.fileName === newImage.fileName
        );
        if (existingNewImage) return of(undefined);

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
    const uploadImage = loadAddImagePostImage(entityId);
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        addImage$(uploadImage, entityId, documentModel, this.entityModel)
      ),
      concatMap(() =>
        this.imageAddBlobProvider.addUploadImageBlob$(uploadImage, file)
      )
    );
  }

  addThreeSixtyImage$(
    entityId: string,
    threeSixtyImageAdd: ThreeSixtyImageAdd
  ): Observable<Image> {
    this.logger.log(`Adding three sixty image ${threeSixtyImageAdd.fileName}`);

    const threeSixtyImage = loadAddThreeSixtyImage(
      entityId,
      threeSixtyImageAdd
    );

    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        addImage$(threeSixtyImage, entityId, documentModel, this.entityModel)
      ),
      map(() => threeSixtyImage)
    );
  }
}
