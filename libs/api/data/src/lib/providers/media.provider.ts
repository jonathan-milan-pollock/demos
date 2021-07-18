import { Injectable } from '@nestjs/common';

import { MediaState, MediaType } from '@dark-rush-photography/shared/types';
import { DocumentModel } from '../schema/document.schema';
import { Media } from '@dark-rush-photography/api/types';

@Injectable()
export class MediaProvider {
  loadMedia(
    type: MediaType,
    id: string,
    fileName: string,
    state: MediaState,
    documentModel: DocumentModel
  ): Media {
    return {
      type,
      id,
      fileName,
      state,
      entityType: documentModel.type,
      entityId: documentModel._id,
      entityGroup: documentModel.group,
      entitySlug: documentModel.slug,
    };
  }
}
