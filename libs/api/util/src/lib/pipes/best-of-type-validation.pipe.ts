import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { BestOfType } from '@dark-rush-photography/shared-types';

@Injectable()
export class BestOfTypeValidationPipe
  implements PipeTransform<string, BestOfType> {
  readonly bestOfDocumentTypeMap = new Map<string, BestOfType>([
    ['children', BestOfType.Children],
    ['events', BestOfType.Events],
    ['landscapes', BestOfType.Landscapes],
    ['nature', BestOfType.Nature],
    ['realestate', BestOfType.RealEstate],
  ]);

  transform(bestOfType: string): BestOfType {
    const bestOfTypeEnum = this.bestOfDocumentTypeMap.get(
      bestOfType.toLowerCase()
    );
    if (!bestOfTypeEnum)
      throw new BadRequestException(`Invalid BestOfType ${bestOfType}`);
    return bestOfTypeEnum;
  }
}
