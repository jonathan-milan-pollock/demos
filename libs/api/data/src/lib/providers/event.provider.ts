import { Injectable } from '@nestjs/common';

import {
  Event,
  EventDto,
  EventMinimalDto,
} from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { loadPublicContent } from '../content/public-content.functions';
import {
  loadEvent,
  loadEventPublic,
  loadMinimalEventPublic,
  loadNewEvent,
} from '../entities/event.functions';

@Injectable()
export class EventProvider {
  loadNewEvent(group: string, slug: string): Event {
    return loadNewEvent(group, slug);
  }

  loadEvent(documentModel: DocumentModel): Event {
    return loadEvent(documentModel);
  }

  loadMinimalEventPublic(documentModel: DocumentModel): EventMinimalDto {
    return loadMinimalEventPublic(
      documentModel,
      loadPublicContent(documentModel)
    );
  }

  loadEventPublic(documentModel: DocumentModel): EventDto {
    return loadEventPublic(documentModel, loadPublicContent(documentModel));
  }
}
