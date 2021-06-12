import { BadRequestException, Injectable } from '@nestjs/common';

import { PostedState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/shared-server/types';

@Injectable()
export class PostedStateProvider {
  readonly postedStateMap = new Map<PostedState, AzureStorageContainerType>([
    [PostedState.New, AzureStorageContainerType.Private],
    [PostedState.Public, AzureStorageContainerType.Public],
    [PostedState.Archived, AzureStorageContainerType.Public],
  ]);

  findAzureStorageContainerType(
    postedState: PostedState
  ): AzureStorageContainerType {
    const azureStorageContainerType = this.postedStateMap.get(postedState);
    if (!azureStorageContainerType)
      throw new BadRequestException(
        `Unable to find AzureStorageContainerType for image state ${postedState}`
      );
    return azureStorageContainerType;
  }
}
