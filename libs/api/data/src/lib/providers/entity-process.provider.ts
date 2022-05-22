import { Injectable } from '@nestjs/common';

import { concatMap, Observable } from 'rxjs';

import { ImageProcessAllProvider } from './image-process-all.provider';

@Injectable()
export class EntityProcessProvider {
  constructor(
    private readonly imageProcessAllProvider: ImageProcessAllProvider
  ) {}

  processEntity$(entityId: string): Observable<void> {
    return this.imageProcessAllProvider.processStarredImage$(entityId).pipe(
      concatMap(() =>
        this.imageProcessAllProvider.processLovedImages$(entityId)
      ),
      concatMap(() => this.imageProcessAllProvider.processAllImages$(entityId))
    );
  }
}
