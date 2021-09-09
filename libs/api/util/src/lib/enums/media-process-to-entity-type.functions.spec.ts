import 'reflect-metadata';

import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getEntityTypeFromMediaProcessType } from './media-process-to-entity-type.functions';

describe('media-process-to-entity-type.functions', () => {
  describe('getEntityTypeFromMediaProcessType', () => {
    it('should return image post', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.ImagePost
      );
      expect(result).toBe(EntityType.ImagePost);
    });

    it('should return image video', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.ImageVideo
      );
      expect(result).toBe(EntityType.ImageVideo);
    });

    it('should return three sixty image post', () => {
      const result = getEntityTypeFromMediaProcessType(
        MediaProcessType.ThreeSixtyImagePost
      );
      expect(result).toBe(EntityType.ThreeSixtyImagePost);
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
