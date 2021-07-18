import { Injectable } from '@nestjs/common';

import {
  BestOf,
  BestOfDto,
  BestOfType,
  EntityType,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadBestOf,
  loadBestOfPublic,
  loadNewBestOf,
} from '../entities/best-of.functions';

@Injectable()
export class BestOfProvider {
  getEntityTypeFromBestOfType(bestOfType: BestOfType): EntityType {
    return this.getEntityTypeFromBestOfType(bestOfType);
  }

  loadNewBestOf(bestOfType: BestOfType): BestOf {
    return loadNewBestOf(bestOfType);
  }

  loadBestOf(documentModel: DocumentModel): BestOf {
    return loadBestOf(documentModel);
  }

  loadBestOfPublic(documentModel: DocumentModel): BestOfDto {
    return loadBestOfPublic(loadPublicContent(documentModel));
  }
}
