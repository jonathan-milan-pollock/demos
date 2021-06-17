import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { BestOfType } from '@dark-rush-photography/shared-types';

@Injectable()
export class BestOfTypeValidationPipe
  implements PipeTransform<string, BestOfType> {
  transform(bestOfType: string): BestOfType {
    const bestOfTypeKey = Object.keys(BestOfType).find(
      (b) => b.toLowerCase() === bestOfType.toLowerCase()
    );
    if (!bestOfTypeKey) {
      throw new BadRequestException(`Invalid BestOfType ${bestOfType}`);
    }
    return bestOfTypeKey as BestOfType;
  }
}
