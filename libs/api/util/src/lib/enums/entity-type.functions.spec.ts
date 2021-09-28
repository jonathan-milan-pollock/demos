import { EntityType } from '@dark-rush-photography/shared/types';
import { getEntityTypeImageFolderName } from './entity-type.functions';

describe('entity-type.functions', () => {
  const entityTypeImageFolderNames: {
    entityType: EntityType;
    imageFolderName?: string;
  }[] = [
    {
      entityType: EntityType.About,
      imageFolderName: 'images',
    },
    {
      entityType: EntityType.BestOf,
      imageFolderName: 'best-37',
    },
    {
      entityType: EntityType.Destination,
      imageFolderName: 'images',
    },
    {
      entityType: EntityType.Favorites,
      imageFolderName: undefined,
    },
    {
      entityType: EntityType.ImageVideo,
      imageFolderName: undefined,
    },
    {
      entityType: EntityType.Review,
      imageFolderName: undefined,
    },
    {
      entityType: EntityType.ReviewMedia,
      imageFolderName: undefined,
    },
    {
      entityType: EntityType.SocialMedia,
      imageFolderName: 'images',
    },
  ];

  describe('getEntityTypeImageFolderName', () => {
    it.each(entityTypeImageFolderNames)(
      'should return image folder name for %s',
      ({ entityType, imageFolderName }) => {
        expect(
          getEntityTypeImageFolderName(entityType) === imageFolderName
        ).toBeTruthy();
      }
    );
  });
});
