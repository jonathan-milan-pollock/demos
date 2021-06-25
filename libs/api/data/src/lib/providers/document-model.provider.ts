import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DocumentModel } from '../schema/document.schema';

@Injectable()
export class DocumentModelProvider {
  validateCreate(documentModel: DocumentModel | null): DocumentModel {
    if (!documentModel) throw new BadRequestException('Unable to create');
    return documentModel;
  }

  validateAdd(documentModel: DocumentModel | null): DocumentModel {
    if (!documentModel) throw new BadRequestException('Unable to add');
    return documentModel;
  }

  validateFind(documentModel: DocumentModel | null): DocumentModel {
    if (!documentModel) throw new NotFoundException();
    return documentModel;
  }

  validateOne = (documentModels: DocumentModel[]): DocumentModel => {
    if (documentModels.length === 0) {
      throw new NotFoundException();
    }

    if (documentModels.length > 1) {
      throw new ConflictException('There can only be one', HttpStatus.CONFLICT);
    }

    return documentModels[0];
  };

  validateRemove(documentModel: DocumentModel | null): void {
    if (!documentModel) {
      throw new BadRequestException('Unable to remove');
    }
  }
}
