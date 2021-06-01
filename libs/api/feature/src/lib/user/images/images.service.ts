import { Inject, Injectable } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';

@Injectable()
export class ImagesService {
  constructor(@Inject(ENV) private readonly env: Env) {}
}
