import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { v4 as uuidv4 } from 'uuid';
import { concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Image, ImageState } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { validateImageWithFileNameNotAlreadyExists } from '../content/image-validation.functions';
import { ImageProvider } from './image.provider';
import { ImageProcessNewProvider } from './image-process-new.provider';

@Injectable()
export class ImageUploadProvider {
  private readonly logger: Logger;

  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageProvider: ImageProvider,
    private readonly imageProcessNewProvider: ImageProcessNewProvider
  ) {
    this.logger = new Logger(ImageUploadProvider.name);
  }
  upload$(
    entityId: string,
    fileName: string,
    isThreeSixty: boolean,
    file: Express.Multer.File
  ): Observable<Image> {
    const id = uuidv4();
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        validateImageWithFileNameNotAlreadyExists(
          ImageState.Selected,
          fileName,
          documentModel
        );
      }),
      concatMap(() =>
        this.imageProvider.add$(
          id,
          entityId,
          ImageState.Selected,
          fileName,
          0,
          isThreeSixty
        )
      ),
      concatMap((image) =>
        this.imageProcessNewProvider
          .upload$(
            image.id,
            image.entityId,
            image.blobPathId,
            image.fileName,
            file
          )
          .pipe(map(() => image))
      )
    );
  }
}
