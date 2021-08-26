import { MediaState, MediaType } from '@dark-rush-photography/shared/types';
import { Media } from '@dark-rush-photography/shared-server/types';
import { DocumentModel } from '../schema/document.schema';

export const loadMedia = (
  type: MediaType,
  id: string,
  fileName: string,
  state: MediaState,
  documentModel: DocumentModel
): Media => ({
  type,
  id,
  fileName,
  state,
  entityType: documentModel.type,
  entityId: documentModel._id,
  entityGroup: documentModel.group,
  entitySlug: documentModel.slug,
});
