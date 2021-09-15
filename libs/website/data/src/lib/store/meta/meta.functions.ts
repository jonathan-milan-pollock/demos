import { Metadata, Page } from '@dark-rush-photography/website/types';

export const getMetadata = (page: Page): Metadata | undefined => {
  switch (page) {
    case Page.Home:
      return {
        title: 'Dark Rush Photography',
        description:
          'Specializes in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case Page.About:
      return {
        title: 'About',
        description:
          'About the Photographers of Dark Rush Photography who specialize in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case Page.Reviews:
      return {
        title: 'Reviews',
        description:
          'Reviews for Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case Page.Review:
      return {
        title: 'Review',
        description:
          'Review Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case Page.PhotoOfTheWeek:
      return {
        title: 'Photo of the Week',
        description:
          'Photo of the Week by Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case Page.Events:
      return {
        title: 'Events',
        description: 'Event Photography by Dark Rush Photography',
      };
    case Page.Destinations:
      return {
        title: 'Destinations',
        description:
          'Extended Reality (XR) destinations presented by Dark Rush Photography',
      };
    case Page.Admin:
      return {
        title: 'Admin',
        description: 'Administration for Dark Rush Photography',
      };
    case Page.AdminImagePost:
      return {
        title: 'Admin Image Post',
        description: 'Administrate Image Posts for Dark Rush Photography',
      };
  }
};
