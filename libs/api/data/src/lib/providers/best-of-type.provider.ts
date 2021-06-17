import { BadRequestException, Injectable } from '@nestjs/common';

import { BestOfType, DocumentType } from '@dark-rush-photography/shared-types';

@Injectable()
export class BestOfTypeProvider {
  readonly bestOfTypeMap = new Map<string, DocumentType>([
    [BestOfType.Children, DocumentType.BestOfChildren],
    [BestOfType.Events, DocumentType.BestOfEvents],
    [BestOfType.Landscapes, DocumentType.BestOfLandscapes],
    [BestOfType.Nature, DocumentType.BestOfNature],
    [BestOfType.RealEstate, DocumentType.BestOfRealEstate],
  ]);

  findDocumentType(bestOfType: BestOfType): DocumentType {
    const documentType = this.bestOfTypeMap.get(bestOfType);
    if (!documentType)
      throw new BadRequestException(
        `Unable to find best of type ${bestOfType}`
      );
    return documentType;
  }
}
