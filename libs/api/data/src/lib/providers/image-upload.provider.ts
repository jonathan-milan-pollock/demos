import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin, ImageState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { addImage$ } from '../content/image-add.functions';
import { uploadImageBlob$ } from '../content/image-add-blob.functions';
import { loadImageAdmin } from '../content/content-load.functions';
import {
  validateImageFound,
  validateImageWithFileNameNotAlreadyExists,
} from '../content/content-validation.functions';
import { ConfigProvider } from './config.provider';
import { ImageProcessProvider } from './image-process.provider';

@Injectable()
export class ImageUploadProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly contentProcessProvider: ImageProcessProvider
  ) {}

  uploadImage$(
    entityId: string,
    fileName: string,
    file: Express.Multer.File
  ): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      concatMap((documentModel) => {
        validateImageWithFileNameNotAlreadyExists(
          ImageState.Selected,
          fileName,
          documentModel
        );

        return addImage$(
          this.entityModel,
          entityId,
          ImageState.Selected,
          fileName,
          0,
          false
        );
      }),
      concatMap((uploadImage) =>
        uploadImageBlob$(
          uploadImage,
          file,
          this.configProvider.azureStorageConnectionStringPublic,
          this.configProvider.azureStorageBlobContainerNamePublic
        )
      ),
      concatMap((uploadImage) =>
        this.contentProcessProvider.processNewImage$(uploadImage)
      ),
      concatMap((uploadImage) =>
        from(this.entityModel.findById(entityId)).pipe(
          map(validateEntityFound),
          map((documentModel) => {
            const image = documentModel.images.find(
              (image) => image.id === uploadImage.id
            );
            const validatedImage = validateImageFound(image);
            return loadImageAdmin(validatedImage);
          })
        )
      )
    );
  }
}
