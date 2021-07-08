import { AzureStorageType } from '@dark-rush-photography/shared-server/types';
import { MediaState } from '@dark-rush-photography/shared/types';
import { BadRequestException } from '@nestjs/common';
import { getAzureStorageTypeFromMediaState } from './media-state-to-azure-storage-type.functions';

describe('media-state-to-azure-storage-type.functions', () => {
  describe('getAzureStorageTypeFromMediaState', () => {
    it('should return private for new', () => {
      const result = getAzureStorageTypeFromMediaState(MediaState.New);
      expect(result).toBe(AzureStorageType.Private);
    });

    it('should return public for public', () => {
      const result = getAzureStorageTypeFromMediaState(MediaState.Public);
      expect(result).toBe(AzureStorageType.Public);
    });

    it('should return public for archived', () => {
      const result = getAzureStorageTypeFromMediaState(MediaState.Archived);
      expect(result).toBe(AzureStorageType.Public);
    });

    it('should throw a range error if media process type is not an entity type', () => {
      const mediaState = '' as MediaState;
      expect(() => {
        getAzureStorageTypeFromMediaState(mediaState);
      }).toThrow(BadRequestException);
    });

    it('should throw correct error message', () => {
      const mediaState = 'invalidMediaState' as MediaState;
      expect(() => {
        getAzureStorageTypeFromMediaState(mediaState);
      }).toThrow(
        `Unable to get Azure storage type from media state ${mediaState}`
      );
    });
  });
});
