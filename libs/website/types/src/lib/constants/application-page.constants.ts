import { Page } from '../interfaces/page.interface';

export class ApplicationPage {
  static readonly HOME: Page = {
    pathname: '/',
    title: 'Dark Rush Photography',
    description:
      'Professional Photographers specializing in Drone, Event, and Real Estate Photography',
  };
  static readonly STORIES: Page = {
    pathname: '/stories',
    title: 'Stories',
    description:
      'Stories by Dark Rush Photography, Professional Photographers specializing in Drone, Event, and Real Estate Photography',
  };
  static readonly WEEKLY_PHOTOS: Page = {
    pathname: '/photo-of-the-week',
    title: 'Photo of the Week',
    description:
      'Photo of the Week by Dark Rush Photography, Professional Photographers specializing in Drone, Event, and Real Estate Photography',
  };
  static readonly EXTENDED_REALITY_STUDIO: Page = {
    pathname: '/extended-reality-studio',
    title: 'Extended Reality Studio',
    description:
      'Extended Reality (XR) (Augmented Reality (AR) and Virtual Reality (VR)) experiences by Dark Rush Photography',
  };
  static readonly REVIEWS: Page = {
    pathname: '/reviews',
    title: 'Reviews',
    description:
      'Reviews for Dark Rush Photography, Professional Photographers specializing in Drone, Event, and Real Estate Photography',
  };
  static readonly REVIEW: Page = {
    pathname: '/review',
    title: 'Review',
    description:
      'Review Dark Rush Photography, Professional Photographers specializing in Drone, Event, and Real Estate Photography',
  };
  static readonly ABOUT: Page = {
    pathname: '/about',
    title: 'About',
    description:
      'About Dark Rush Photography, Professional Photographers specializing in Drone, Event, and Real Estate Photography',
  };
}
