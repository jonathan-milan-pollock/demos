import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { ImageAdmin } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { loadImageAdmin } from '../content/content-load.functions';
import { validateImageFound } from '../content/content-validation.functions';

@Injectable()
export class ImageFindProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  findOne$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map((documentModel) => {
        return loadImageAdmin(validateImageFound(imageId, documentModel));
      })
    );
  }
}
