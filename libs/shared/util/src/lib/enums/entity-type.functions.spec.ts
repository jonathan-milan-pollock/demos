import { ConflictException } from '@nestjs/common';

import faker from '@faker-js/faker';

import { EntityType } from '@dark-rush-photography/shared/types';
import {
  getEntityTypeHasImageVideo,
  getEntityTypeHasLovedImages,
  getEntityTypeHasStarredImage,
  getEntityTypeNewImagesFolderName,
} from './entity-type.functions';

describe('entity-type.functions', () => {
  describe('getEntityTypeNewImagesFolderName', () => {
    const entityTypeNewImagesFolderNames: {
      entityType: EntityType;
      newImagesFolderName?: string;
    }[] = [
      {
        entityType: EntityType.About,
        newImagesFolderName: 'images',
      },
      {
        entityType: EntityType.BestOf,
        newImagesFolderName: 'best-37',
      },
      {
        entityType: EntityType.Destination,
        newImagesFolderName: 'images',
      },
      {
        entityType: EntityType.Event,
        newImagesFolderName: 'images',
      },
      {
        entityType: EntityType.Favorites,
        newImagesFolderName: undefined,
      },
      {
        entityType: EntityType.ImagePost,
        newImagesFolderName: undefined,
      },
      {
        entityType: EntityType.ImageVideo,
        newImagesFolderName: undefined,
      },
      {
        entityType: EntityType.PhotoOfTheWeek,
        newImagesFolderName: undefined,
      },
      {
        entityType: EntityType.Review,
        newImagesFolderName: undefined,
      },
      {
        entityType: EntityType.ReviewMedia,
        newImagesFolderName: undefined,
      },
      {
        entityType: EntityType.Test,
        newImagesFolderName: undefined,
      },
    ];

    it.each(entityTypeNewImagesFolderNames)(
      'should return new images folder name or undefined %s',
      ({ entityType, newImagesFolderName }) => {
        expect(getEntityTypeNewImagesFolderName(entityType)).toBe(
          newImagesFolderName
        );
      }
    );
  });

  describe('getEntityTypeHasStarredImage', () => {
    const entityTypeHasStarredImage: {
      entityType: EntityType;
      hasStarredImage: boolean;
    }[] = [
      {
        entityType: EntityType.About,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.BestOf,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.Destination,
        hasStarredImage: true,
      },
      {
        entityType: EntityType.Event,
        hasStarredImage: true,
      },
      {
        entityType: EntityType.Favorites,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.ImagePost,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.ImageVideo,
        hasStarredImage: true,
      },
      {
        entityType: EntityType.PhotoOfTheWeek,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.Review,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.ReviewMedia,
        hasStarredImage: false,
      },
      {
        entityType: EntityType.Test,
        hasStarredImage: false,
      },
    ];

    it.each(entityTypeHasStarredImage)(
      'should return if entity type has a starred image %s',
      ({ entityType, hasStarredImage }) => {
        expect(getEntityTypeHasStarredImage(entityType)).toBe(hasStarredImage);
      }
    );

    it('should throw a conflict exception if cannot get has starred image', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        getEntityTypeHasStarredImage(entityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get has starred image for entity type ${entityType}`
      );
    });

    it.each(Object.values(EntityType))(
      'should not throw for any entity type %s',
      (entityType) => {
        const result = () => {
          getEntityTypeHasStarredImage(entityType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getEntityTypeHasLovedImages', () => {
    const entityTypeHasLovedImage: {
      entityType: EntityType;
      hasLovedImage: boolean;
    }[] = [
      {
        entityType: EntityType.About,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.BestOf,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.Destination,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.Event,
        hasLovedImage: true,
      },
      {
        entityType: EntityType.Favorites,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.ImagePost,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.ImageVideo,
        hasLovedImage: true,
      },
      {
        entityType: EntityType.PhotoOfTheWeek,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.Review,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.ReviewMedia,
        hasLovedImage: false,
      },
      {
        entityType: EntityType.Test,
        hasLovedImage: false,
      },
    ];

    it.each(entityTypeHasLovedImage)(
      'should return if entity type has a loved image %s',
      ({ entityType, hasLovedImage }) => {
        expect(getEntityTypeHasLovedImages(entityType)).toBe(hasLovedImage);
      }
    );

    it('should throw a conflict exception if cannot get has loved image', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        getEntityTypeHasLovedImages(entityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get has loved image for entity type ${entityType}`
      );
    });

    it.each(Object.values(EntityType))(
      'should not throw for any entity type %s',
      (entityType) => {
        const result = () => {
          getEntityTypeHasLovedImages(entityType);
        };
        expect(result).not.toThrow();
      }
    );
  });

  describe('getEntityTypeHasImageVideo', () => {
    const entityTypeHasImageVideo: {
      entityType: EntityType;
      hasImageVideo: boolean;
    }[] = [
      {
        entityType: EntityType.About,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.BestOf,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.Destination,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.Event,
        hasImageVideo: true,
      },
      {
        entityType: EntityType.Favorites,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.ImagePost,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.ImageVideo,
        hasImageVideo: true,
      },
      {
        entityType: EntityType.PhotoOfTheWeek,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.Review,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.ReviewMedia,
        hasImageVideo: false,
      },
      {
        entityType: EntityType.Test,
        hasImageVideo: false,
      },
    ];

    it.each(entityTypeHasImageVideo)(
      'should return if entity type has an image video %s',
      ({ entityType, hasImageVideo }) => {
        expect(getEntityTypeHasImageVideo(entityType)).toBe(hasImageVideo);
      }
    );

    it('should throw a conflict exception if cannot get has image video', () => {
      const entityType = faker.lorem.word() as EntityType;
      const result = () => {
        getEntityTypeHasImageVideo(entityType);
      };
      expect(result).toThrow(ConflictException);
      expect(result).toThrow(
        `Could not get has image video for entity type ${entityType}`
      );
    });

    it.each(Object.values(EntityType))(
      'should not throw for any entity type %s',
      (entityType) => {
        const result = () => {
          getEntityTypeHasImageVideo(entityType);
        };
        expect(result).not.toThrow();
      }
    );
  });
});
