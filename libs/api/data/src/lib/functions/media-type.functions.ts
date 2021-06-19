import { BadRequestException } from '@nestjs/common';

import { DocumentType, MediaType } from '@dark-rush-photography/shared-types';

const mediaTypeMap = new Map<MediaType, DocumentType>([
  [MediaType.AppleIcon, DocumentType.MediaAppleIcon],
  [MediaType.AppleResource, DocumentType.MediaAppleResource],
  [MediaType.Png, DocumentType.MediaPng],
  [MediaType.Video, DocumentType.MediaVideo],
]);

export const findDocumentTypeFromMediaType = (
  mediaType: MediaType
): DocumentType => {
  const documentType = mediaTypeMap.get(mediaType);
  if (!documentType)
    throw new BadRequestException(`Unable to find media type ${mediaType}`);
  return documentType;
};
