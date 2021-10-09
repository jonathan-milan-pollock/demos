import { Injectable } from '@nestjs/common';

import { map, Observable } from 'rxjs';

import {
  ImageAdmin,
  ImageUpdate,
  ThreeSixtyImageAdd,
} from '@dark-rush-photography/shared/types';
import { loadImageAdmin } from '../content/content-load.functions';
import { ImageAddProvider } from '../providers/image-add.provider';
import { ImageUpdateProvider } from '../providers/image-update.provider';
import { ImageStateChangeProvider } from '../providers/image-state-change.provider';
import { ImageRemoveProvider } from '../providers/image-remove.provider';

@Injectable()
export class ImagesService {
  constructor(
    private readonly imageAddProvider: ImageAddProvider,
    private readonly imageUpdateProvider: ImageUpdateProvider,
    private readonly imageStateChangeProvider: ImageStateChangeProvider,
    private readonly imageRemoveProvider: ImageRemoveProvider
  ) {}

  addThreeSixtyImage$(
    entityId: string,
    threeSixtyImageAdd: ThreeSixtyImageAdd
  ): Observable<ImageAdmin> {
    return this.imageAddProvider
      .addThreeSixtyImage$(entityId, threeSixtyImageAdd)
      .pipe(map((image) => loadImageAdmin(image)));
  }

  update$(
    imageId: string,
    entityId: string,
    imageUpdate: ImageUpdate
  ): Observable<ImageAdmin> {
    return this.imageUpdateProvider.updateImage$(
      imageId,
      entityId,
      imageUpdate
    );
  }

  select$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return this.imageStateChangeProvider.selectImage$(imageId, entityId);
  }

  archive$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return this.imageStateChangeProvider.archiveImage$(imageId, entityId);
  }

  unarchive$(imageId: string, entityId: string): Observable<ImageAdmin> {
    return this.imageStateChangeProvider.unarchiveImage$(imageId, entityId);
  }

  remove$(imageId: string, entityId: string): Observable<void> {
    return this.imageRemoveProvider.removeImage$(imageId, entityId);
  }
}
