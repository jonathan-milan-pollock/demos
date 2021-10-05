import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';
import { validateImageFoundInEntity } from '../content/content-validation.functions';
import { loadImageAdmin } from '../content/content-load.functions';

@Injectable()
export class ImageFindProvider {
  private readonly logger: Logger;

  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {
    this.logger = new Logger(ImageFindProvider.name);
  }

  findOne$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        const image = validateImageFoundInEntity(imageId, documentModel);
        return loadImageAdmin(image);
      })
    );
  }
}
