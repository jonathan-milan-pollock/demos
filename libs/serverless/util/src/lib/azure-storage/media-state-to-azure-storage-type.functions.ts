import { BadRequestException } from '@nestjs/common';

import { MediaState } from '@dark-rush-photography/shared/types';
import { AzureStorageType } from '@dark-rush-photography/serverless/types';

const mediaStateToAzureStorageTypeMap = new Map<MediaState, AzureStorageType>([
  [MediaState.New, AzureStorageType.Private],
  [MediaState.Public, AzureStorageType.Public],
  [MediaState.Archived, AzureStorageType.Public],
]);

export const getAzureStorageTypeFromMediaState = (
  mediaState: MediaState
): AzureStorageType => {
  const azureStorageType = mediaStateToAzureStorageTypeMap.get(mediaState);
  if (!azureStorageType)
    throw new BadRequestException(
      `Unable to get Azure storage type from media state ${mediaState}`
    );
  return azureStorageType;
};
