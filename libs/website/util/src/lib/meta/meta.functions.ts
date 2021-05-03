import { Metadata } from '@dark-rush-photography/shared-types';
import { PageType } from '@dark-rush-photography/website/types';

const darkRushPhotography = 'Dark Rush Photography';
const specialties =
  'Event Photography, Real Estate Photography, and Extended Reality (XR)';
const specializingIn = `specializing in ${specialties}`;
const adminForDarkRushPhotography = 'Admin for Dark Rush Photography';

export const getMetadata = (
  pageType: PageType,
  url: string
): Metadata | undefined => {
  let metadata = { url: url } as Partial<Metadata>;
  switch (pageType) {
    case PageType.Home:
      metadata = {
        title: darkRushPhotography,
        description: `Specializes in ${specialties}`,
      };
      break;
    case PageType.About:
      metadata = {
        title: 'About',
        description: `About ${darkRushPhotography}, ${specializingIn}`,
      };
      break;
    case PageType.Reviews:
      metadata = {
        title: 'Reviews',
        description: `Reviews for ${darkRushPhotography}, ${specializingIn}`,
      };
      break;
    case PageType.Review:
      metadata = {
        title: 'Review',
        description: `Review ${darkRushPhotography}, ${specializingIn}`,
      };
      break;
    case PageType.PhotoOfTheWeek:
      metadata = {
        title: 'Photo of the Week',
        description: `Photo of the Week by ${darkRushPhotography}, ${specializingIn}`,
      };
      break;
    case PageType.Events:
      metadata = {
        title: 'Stories',
        description: `Stories by ${darkRushPhotography}, ${specializingIn}`,
      };
      break;
    case PageType.Destinations:
      metadata = {
        title: 'Destinations',
        description: `Destinations by ${darkRushPhotography}, ${specializingIn}`,
      };
      break;
    case PageType.Admin:
      metadata = {
        title: 'Admin',
        description: adminForDarkRushPhotography,
      };
      break;
    case PageType.HomeAdmin:
      metadata = {
        title: 'Home Admin',
        description: `Home ${adminForDarkRushPhotography}`,
      };
      break;
    case PageType.PhotoOfTheWeekAdmin:
      metadata = {
        title: 'Photo of the Week Admin',
        description: `Photo of the Week ${adminForDarkRushPhotography}`,
      };
      break;
    case PageType.StoriesAdmin:
      metadata = {
        title: 'Stories Admin',
        description: `Stories ${adminForDarkRushPhotography}`,
      };
      break;
    case PageType.DestinationsAdmin:
      metadata = {
        title: 'Destinations Admin',
        description: `Destinations ${adminForDarkRushPhotography}`,
      };
      break;
    case PageType.SitemapAdmin:
      metadata = {
        title: 'Sitemap Admin',
        description: `Sitemap ${adminForDarkRushPhotography}`,
      };
      break;
    case PageType.VideoAdmin:
      metadata = {
        title: 'Video Admin',
        description: `Video ${adminForDarkRushPhotography}`,
      };
      break;
  }
  return metadata as Metadata;
};
