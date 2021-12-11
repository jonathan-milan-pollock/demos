import { EntityType } from '@dark-rush-photography/shared/types';

export const findEntityTypeFromRouteConfigPath = (
  routeConfigPath: string
): EntityType => {
  let entityType: EntityType | undefined = undefined;
  switch (routeConfigPath) {
    case 'about':
      entityType = EntityType.About;
      break;
    case 'destinations':
      entityType = EntityType.Destination;
      break;
    case 'events':
      entityType = EntityType.Event;
      break;
    case '':
      entityType = EntityType.Favorites;
      break;
    case 'photo-of-the-week':
      entityType = EntityType.PhotoOfTheWeek;
      break;
    case 'reviews':
      entityType = EntityType.Review;
      break;
    case 'reviews/review':
      entityType = EntityType.ReviewMedia;
      break;
    default:
      throw new Error('Could not find entity type from route config path');
  }

  return entityType;
};

export const findEntityTypeFromUrlSegment = (
  urlSegment: string
): EntityType => {
  let entityType: EntityType | undefined = undefined;
  switch (urlSegment) {
    case 'events':
      entityType = EntityType.Event;
      break;
    case 'photo-of-the-week':
      entityType = EntityType.PhotoOfTheWeek;
      break;
    default:
      throw new Error('Could not find entity type from url segment');
  }

  return entityType;
};
