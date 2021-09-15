import 'reflect-metadata';

import {
  EntityType,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { getMediaProcessTypeFromEntityType } from './entity-to-media-process-type.functions';

describe('entity-to-media-process-type.functions', () => {
  describe('getMediaProcessTypeFromEntityType', () => {
    it('should return image post', () => {
      const result = getMediaProcessTypeFromEntityType(EntityType.ImagePost);
      expect(result).toBe(MediaProcessType.ImagePost);
    });

    it('should return image video', () => {
      const result = getMediaProcessTypeFromEntityType(EntityType.ImageVideo);
      expect(result).toBe(MediaProcessType.ImageVideo);
    });

    it('should return three sixty image post', () => {
      const result = getMediaProcessTypeFromEntityType(
        EntityType.ThreeSixtyImagePost
      );
      expect(result).toBe(MediaProcessType.ThreeSixtyImagePost);
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
