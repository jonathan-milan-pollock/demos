import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import { PostedState } from '@dark-rush-photography/shared-types';

@Injectable()
export class PostedStateValidationPipe
  implements PipeTransform<string, PostedState> {
  transform(postedState: string): PostedState {
    const postedStateKey = Object.keys(PostedState).find(
      (p) => p.toLowerCase() === postedState.toLowerCase()
    );
    if (!postedStateKey) {
      throw new BadRequestException(`Invalid PostedState ${postedState}`);
    }
    return postedStateKey as PostedState;
  }
}
