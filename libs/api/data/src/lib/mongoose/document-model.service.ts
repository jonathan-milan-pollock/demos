import { BestOf } from '@dark-rush-photography/shared-types';
import { Injectable } from '@nestjs/common';
import { DocumentModel } from './document.schema';

@Injectable()
export class DocumentModelService {
  toBestOf(documentModel: DocumentModel): BestOf {
    return {
      id: documentModel.id,
      bestOfType: documentModel.bestOfType,
      images: documentModel.images,
      emotions: documentModel.emotions,
      comments: documentModel.comments,
    } as BestOf;
  }
}
