import { Injectable } from '@nestjs/common';

import {
  Destination,
  DestinationDto,
  DestinationMinimalDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadDestination,
  loadDestinationPublic,
  loadMinimalDestinationPublic,
  loadNewDestination,
} from '../entities/destination.functions';

@Injectable()
export class DestinationProvider {
  loadNewDestination(slug: string): Destination {
    return loadNewDestination(slug);
  }

  loadDestination(documentModel: DocumentModel): Destination {
    return loadDestination(documentModel);
  }

  loadMinimalDestinationPublic(
    documentModel: DocumentModel
  ): DestinationMinimalDto {
    return loadMinimalDestinationPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadDestinationPublic(documentModel: DocumentModel): DestinationDto {
    return loadDestinationPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }
}
