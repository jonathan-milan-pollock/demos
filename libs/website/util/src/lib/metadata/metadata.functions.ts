import { Metadata, PageType } from '@dark-rush-photography/website/types';

export const getMetadataForPageType = (pageType: PageType): Metadata => {
  switch (pageType) {
    case PageType.Home:
      return {
        title: 'Dark Rush Photography',
        seoDescription:
          'Specializes in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case PageType.About:
      return {
        title: 'About',
        seoDescription:
          'About the Photographers of Dark Rush Photography who specialize in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case PageType.Reviews:
      return {
        title: 'Reviews',
        seoDescription:
          'Reviews for Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case PageType.ReviewMedia:
      return {
        title: 'Review',
        seoDescription:
          'Review Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case PageType.PhotoOfTheWeek:
      return {
        title: 'Photo of the Week',
        seoDescription:
          'Photo of the Week by Dark Rush Photography, specializing in Event Photography, Real Estate Photography, and Extended Reality (XR)',
      };
    case PageType.Events:
      return {
        title: 'Events',
        seoDescription: 'Event Photography by Dark Rush Photography',
      };
    case PageType.Destinations:
      return {
        title: 'Destinations',
        seoDescription:
          'Extended Reality (XR) destinations presented by Dark Rush Photography',
      };
    default:
      throw new Error(`Metadata is not found for page type ${pageType}`);
  }
};
