import { BadRequestException, Injectable } from '@nestjs/common';

import { DocumentType } from '@dark-rush-photography/shared-types';

@Injectable()
export class BestOfTypeProvider {
  readonly bestOfTypeMap = new Map<string, DocumentType>([
    ['children', DocumentType.BestOfChildren],
    ['events', DocumentType.BestOfEvents],
    ['landscapes', DocumentType.BestOfLandscapes],
    ['nature', DocumentType.BestOfNature],
    ['realestate', DocumentType.BestOfRealEstate],
  ]);

  findDocumentType(bestOfType: string): DocumentType {
    const documentType = this.bestOfTypeMap.get(bestOfType.toLowerCase());
    if (!documentType)
      throw new BadRequestException(
        `Unable to find document type for best of type ${bestOfType}`
      );
    return documentType;
  }
}
