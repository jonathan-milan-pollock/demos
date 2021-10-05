import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { catchError, concatMap, from, map, Observable } from 'rxjs';
import { Model } from 'mongoose';

import { Document, DocumentModel } from '../schema/document.schema';
import { validateEntityFound } from '../entities/entity-validation.functions';
import { ConfigProvider } from './config.provider';
import { ImageStateChangeProvider } from './image-state-change.provider';

@Injectable()
export class EntityPublishProvider {
  constructor(
    private readonly configProvider: ConfigProvider,
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>,
    private readonly imageStateChangeProvider: ImageStateChangeProvider
  ) {}

  //TODO: Need to rename images slug with the entity slug
  publish$(entityId: string): Observable<DocumentModel | null> {
    return from(this.entityModel.findById(entityId)).pipe(
      map(validateEntityFound),
      catchError((documentModel) =>
        from(
          this.entityModel.findByIdAndUpdate(documentModel._id, {
            isProcessing: true,
          })
        )
      ),
      // add to the media process table entry for
      // id and renameMediaWithEntitySlug
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
