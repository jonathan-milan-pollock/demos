import { Inject, Injectable } from '@nestjs/common';

import { ENV } from '@dark-rush-photography/shared-types';
import { Env } from '@dark-rush-photography/api/types';

@Injectable()
export class UserBestOfService {
  constructor(@Inject(ENV) private readonly env: Env) {}

  create(documentType: string, slug: string, id: number): void {
    console.log(`star ${id} image`);
  }

  update(documentType: string, slug: string, id: number): void {
    console.log(`star ${id} image`);
  }

  delete(documentType: string, slug: string, id: number): void {
    console.log(`un-star ${id} image`);
  }
}
