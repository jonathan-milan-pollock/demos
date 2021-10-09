import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, map, Observable } from 'rxjs';
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
import { validateEntityFound } from '../entities/entity-validation.functions';
import {
  loadAddImage,
  loadAddThreeSixtyImage,
} from '../content/content-load-document-model.functions';
import { addImage$ } from '../content/content-repository.functions';
import { ContentAddBlobProvider } from './content-add-blob.provider';
import { validateImageWithFileNameNotAlreadyExists } from '../content/content-validation.functions';

@Injectable()
export class ImageAddProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentAddBlobProvider: ContentAddBlobProvider
  ) {
    this.logger = new Logger(ImageAddProvider.name);
  }

  addNewImage$(
    googleDrive: drive_v3.Drive,
    newImageFile: GoogleDriveFile,
    entityId: string
  ): Observable<Image> {
    this.logger.log(`Adding new image ${newImageFile.name}`);

    const newImage = loadAddImage(
      entityId,
      uuidv4(),
      newImageFile.name,
      ImageState.New,
      getOrderFromGoogleDriveImageFile(newImageFile.name)
    );

    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      concatMap((documentModel) =>
        addImage$(newImage, entityId, documentModel, this.entityModel)
      ),
      concatMap(() =>
        this.contentAddBlobProvider.addNewImageBlob$(
          googleDrive,
          newImageFile,
          newImage
        )
      ),
      map(() => newImage)
    );
  }

  addUploadImage$(
    entityId: string,
    fileName: string,
    file: Express.Multer.File
  ): Observable<void> {
    this.logger.log(`Adding upload image ${fileName}`);

    const uploadImage = loadAddImage(
      entityId,
      uuidv4(),
      fileName,
      ImageState.Selected,
      0
    );

    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map((documentModel) =>
        validateImageWithFileNameNotAlreadyExists(
          fileName,
          ImageState.Selected,
          documentModel
        )
      ),
      concatMap((documentModel) =>
        addImage$(uploadImage, entityId, documentModel, this.entityModel)
      ),
      concatMap(() =>
        this.contentAddBlobProvider.addUploadImageBlob$(uploadImage, file)
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
