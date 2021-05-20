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
    case Page.AdminHomePage:
      return {
        title: 'Admin Home Page',
        description: 'Administrate Home Page for Dark Rush Photography',
      };
    case Page.AdminReviews:
      return {
        title: 'Admin Reviews',
        description: 'Administrate Reviews for Dark Rush Photography',
      };
    case Page.AdminPhotoOfTheWeek:
      return {
        title: 'Admin Photo of the Week',
        description: 'Administrate Photo of the Week for Dark Rush Photography',
      };
    case Page.AdminEvents:
      return {
        title: 'Admin Events',
        description: 'Administrate Events for Dark Rush Photography',
      };
    case Page.AdminDestinations:
      return {
        title: 'Admin Destinations',
        description: 'Administrate Destinations for Dark Rush Photography',
      };
    case Page.AdminVideos:
      return {
        title: 'Admin Videos',
        description: 'Administrate Videos for Dark Rush Photography',
      };
    case Page.AdminSitemap:
      return {
        title: 'Admin Sitemap',
        description: 'Administrate Sitemap for Dark Rush Photography',
      };
    case Page.AdminSettings:
      return {
        title: 'Admin Settings',
        description: 'Administrate Settings for Dark Rush Photography',
      };
  }
};
