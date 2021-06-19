import { BadRequestException } from '@nestjs/common';

import { BestOfType, DocumentType } from '@dark-rush-photography/shared-types';

const bestOfTypeMap = new Map<BestOfType, DocumentType>([
  [BestOfType.Children, DocumentType.BestOfChildren],
  [BestOfType.Events, DocumentType.BestOfEvents],
  [BestOfType.Landscapes, DocumentType.BestOfLandscapes],
  [BestOfType.Nature, DocumentType.BestOfNature],
  [BestOfType.RealEstate, DocumentType.BestOfRealEstate],
]);

export const findDocumentTypeFromBestOfType = (
  bestOfType: BestOfType
): DocumentType => {
  const documentType = bestOfTypeMap.get(bestOfType);
  if (!documentType)
    throw new BadRequestException(`Unable to find best of type ${bestOfType}`);
  return documentType;
};
