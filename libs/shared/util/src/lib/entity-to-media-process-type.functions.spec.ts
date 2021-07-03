import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getMediaProcessTypeFromEntityType } from './entity-to-media-process-type.functions';

describe('entity-to-media-process-type.functions', () => {
  describe('getMediaProcessTypeFromEntityType', () => {
    it('should return apple resource', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessAppleResource
      );
      expect(result).toBe(MediaProcessType.AppleResource);
    });

    it('should return icon', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessIcon
      );
      expect(result).toBe(MediaProcessType.Icon);
    });

    it('should return image video', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessImageVideo
      );
      expect(result).toBe(MediaProcessType.ImageVideo);
    });

    it('should return png', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessPng
      );
      expect(result).toBe(MediaProcessType.Png);
    });

    it('should return social media image', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessSocialMediaImage
      );
      expect(result).toBe(MediaProcessType.SocialMediaImage);
    });

    it('should return social media video', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.MediaProcessSocialMediaVideo
      );
      expect(result).toBe(MediaProcessType.SocialMediaVideo);
    });

    it('should throw a range error if entity type is not a media process type', () => {
      const entityType = '' as EntityType;
      expect(() => {
        getMediaProcessTypeFromEntityType(entityType);
      }).toThrow(RangeError);
    });

    it('should throw correct error message', () => {
      const entityType = 'invalidEntityType' as EntityType;
      expect(() => {
        getMediaProcessTypeFromEntityType(entityType);
      }).toThrow(
        `Unable to get media process type from entity type ${entityType}`
      );
    });
  });
});
