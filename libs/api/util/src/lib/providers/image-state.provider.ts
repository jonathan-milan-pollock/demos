import { ConflictException, Injectable } from '@nestjs/common';

import { ImageState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server-types';

@Injectable()
export class ImageStateProvider {
  findAzureStorageContainerType(
    imageState: ImageState
  ): AzureStorageContainerType {
    switch (imageState) {
      case ImageState.New:
        return AzureStorageContainerType.Private;
      case ImageState.Public:
      case ImageState.Archived:
        return AzureStorageContainerType.Public;
      default:
        throw new ConflictException(
          `Unable to find AzureStorageContainerType for imageState ${imageState}`
        );
    }
  }
}
