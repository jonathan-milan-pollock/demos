import { BadRequestException } from '@nestjs/common';

import { PostState } from '@dark-rush-photography/shared-types';
import { AzureStorageContainerType } from '@dark-rush-photography/serverless/types';

const postStateMap = new Map<PostState, AzureStorageContainerType>([
  [PostState.New, AzureStorageContainerType.Private],
  [PostState.Public, AzureStorageContainerType.Public],
  [PostState.Archived, AzureStorageContainerType.Public],
]);

export const findAzureStorageContainerType = (
  postState: PostState
): AzureStorageContainerType => {
  const azureStorageContainerType = postStateMap.get(postState);
  if (!azureStorageContainerType)
    throw new BadRequestException(
      `Unable to find AzureStorageContainerType for image state ${postState}`
    );
  return azureStorageContainerType;
};
