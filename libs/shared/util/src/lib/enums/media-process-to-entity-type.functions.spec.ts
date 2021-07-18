import 'reflect-metadata';

import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeFromMediaProcessType } from './media-process-to-entity-type.functions';

describe('media-process-to-entity-type.functions', () => {
  describe('getEntityTypeFromMediaProcessType', () => {
    it('should return image video', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.ImageVideo
      );
      expect(result).toBe(EntityType.MediaProcessImageVideo);
    });

    it('should return social media image', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.SocialMediaImage
      );
      expect(result).toBe(EntityType.MediaProcessSocialMediaImage);
    });

    it('should return social media three sixty image', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.SocialMediaThreeSixtyImage
      );
      expect(result).toBe(EntityType.MediaProcessSocialMediaThreeSixtyImage);
    });

    it('should return social media video', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.SocialMediaVideo
      );
      expect(result).toBe(EntityType.MediaProcessSocialMediaVideo);
    });

    it('should return social media three sixty video', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.SocialMediaThreeSixtyVideo
      );
      expect(result).toBe(EntityType.MediaProcessSocialMediaThreeSixtyVideo);
    });

    it('should throw a range error if media process type is not an entity type', () => {
      const mediaProcessType = '' as MediaProcessType;
      expect(() => {
        getEntityTypeFromMediaProcessType(mediaProcessType);
      }).toThrow(RangeError);
    });

    it('should throw correct error message', () => {
      const mediaProcessType = 'invalidMediaProcessType' as MediaProcessType;
      expect(() => {
        getEntityTypeFromMediaProcessType(mediaProcessType);
      }).toThrow(
        `Unable to get entity type from media process type ${mediaProcessType}`
      );
    });
  });
});
