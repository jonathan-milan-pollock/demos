import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { catchError, concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import { ConfigProvider } from './config.provider';
import { validateEntityFound } from '../entities/entity-validation.functions';

@Injectable()
export class EntitySocialMediaPostProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  postSocialMedia$(entityId: string): Observable<DocumentModel | null> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      catchError((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(documentModel._id, {
            isProcessing: true,
          })
        )
      ),
      concatMap(() =>
        from(
          this.entityModel.findByIdAndUpdate(entityId, {
            isProcessing: true,
          })
        )
      )
    );
  }
}
