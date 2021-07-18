import {
  About,
  BestOf,
  Destination,
  Event,
  Favorites,
  MediaProcess,
  PhotoOfTheWeek,
  Review,
  ReviewMedia,
  SocialMedia,
} from '@dark-rush-photography/shared/types';

export interface Entity
  extends About,
    BestOf,
    Destination,
    Event,
    Favorites,
    MediaProcess,
    PhotoOfTheWeek,
    ReviewMedia,
    Review,
    SocialMedia {}
