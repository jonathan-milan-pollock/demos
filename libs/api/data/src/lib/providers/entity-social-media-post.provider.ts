import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { catchError, concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { SocialMediaType } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import {
  validateEntityFound,
  validateEntityIsPublished,
} from '../entities/entity-validation.functions';

@Injectable()
export class EntitySocialMediaPostProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  postSocialMedia$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      map(validateEntityFound),
      map(validateEntityIsPublished),
      concatMap(() => from(Object.values(SocialMediaType))),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            isProcessing: true,
          })
        )
      ),

      catchError((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(documentModel._id, {
            isProcessing: false,
          })
        )
      ),
      map(() => undefined)
    );
  }
}
