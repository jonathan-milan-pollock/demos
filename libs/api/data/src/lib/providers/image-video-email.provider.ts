import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { catchError, concatMap, from, last, map, Observable, of } from 'rxjs';
import { Model } from 'mongoose';

import { SocialMediaType } from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';
import { findEntityById$ } from '../entities/entity-repository.functions';
import { validateEntityFound } from '../entities/entity-validate-document-model.functions';

@Injectable()
export class ImageVideoEmailProvider {
  constructor(
    @InjectModel(Document.name)
    private readonly entityModel: Model<DocumentModel>
  ) {}

  sendEmail$(entityId: string): Observable<void> {
    return findEntityById$(entityId, this.entityModel).pipe(
      // map(validateEntityFound),
      //concatMap(() => from(Object.values(SocialMediaType))),
      //last(),
      map(() => undefined)
    );
  }
}
