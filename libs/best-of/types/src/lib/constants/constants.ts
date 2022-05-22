import { Page } from '../interfaces/page.interface';

// Application
export const APPLICATION_URL = 'https://darkrushphotography.com';
export const APPLICATION_VERSION = 26;
export const APPLICATION_CDN_URL =
  'https://dark-rush-photography-images.azureedge.net';
export const APPLICATION_LOGO_URL =
  'https://dark-rush-photography-images.azureedge.net/dark-rush-photography-content/logos/dark-rush-photography-logo.png';
export const APPLICATION_FADE_TIME = 800;

// Application Layout
export const APPLICATION_LAYOUT_SCROLLBAR_WIDTH = 13;
export const APPLICATION_LAYOUT_MASTER_WIDTH = 480;
export const APPLICATION_LAYOUT_TITLE_BAR_HEIGHT = 88;
export const APPLICATION_LAYOUT_TOP_NAVIGATION_BAR_HEIGHT = 106;
export const APPLICATION_LAYOUT_HOME_TAB_BAR_HEIGHT = 72;
export const APPLICATION_LAYOUT_HOME_TAB_BAR_HEIGHT_TEXT_WRAPPED = 87.66;
export const APPLICATION_LAYOUT_HOME_TAB_BAR_MIN_WIDTH = 706;
export const APPLICATION_LAYOUT_STORY_MASTER_TAB_BAR_HEIGHT = 48;
export const APPLICATION_LAYOUT_OPTIONS_BAR_HEIGHT = 64;
export const APPLICATION_LAYOUT_MASTER_IMAGE_HEIGHT = 300;
export const APPLICATION_LAYOUT_BOTTOM_DIVIDER_HEIGHT = 2;
export const APPLICATION_LAYOUT_CONTACT_BAR_HEIGHT = 46;
export const APPLICATION_LAYOUT_CONTACT_BAR_MIN_WIDTH = 640;
export const APPLICATION_LAYOUT_BOTTOM_NAVIGATION_BAR_HEIGHT = 56;
export const APPLICATION_LAYOUT_SOCIAL_MEDIA_BAR_HEIGHT = 45;
export const APPLICATION_LAYOUT_IMAGES_GALLERY_BUTTON_WIDTH = 64;
export const APPLICATION_LAYOUT_IMAGES_GALLERY_BUTTON_HEIGHT = 52;

// Image Dimension
export const IMAGE_DIMENSION_TILE_IMAGE_WIDTH = 260;
export const IMAGE_DIMENSION_TILE_IMAGE_HEIGHT = 186;
export const IMAGE_DIMENSION_SMALL_IMAGE_LONGEST_EDGE = 600;
export const IMAGE_DIMENSION_MEDIUM_IMAGE_LONGEST_EDGE = 1400;
export const IMAGE_DIMENSION_LARGE_IMAGE_LONGEST_EDGE = 2000;

// social medial urls
export const SOCIAL_MEDIA_URL_FACEBOOK =
  'https://www.facebook.com/darkrushphotography/';
export const SOCIAL_MEDIA_URL_INSTAGRAM =
  'https://www.instagram.com/darkrushphotography/';
export const SOCIAL_MEDIA_URL_LINKEDIN =
  'https://www.linkedin.com/company/dark-rush-photography/';
export const SOCIAL_MEDIA_URL_LINKEDIN_DARK_RUSH =
  'https://www.linkedin.com/in/dark-rush/';
export const SOCIAL_MEDIA_URL_YOUTUBE =
  'https://www.youtube.com/channel/UCYnbcE9nrZv7rBuAF7tLFdw/';
export const SOCIAL_MEDIA_URL_GOOGLE_BUSINESS_REVIEW =
  'https://g.page/darkrushphotography/review';
export const SOCIAL_MEDIA_URL_ALIGNABLE =
  'https://www.alignable.com/atlanta-ga/dark-rush-photography-atlanta/';

// Local Storage
export const LOCAL_STORAGE_THEME_TYPE = 'THEME_TYPE';

export default class ApplicationPage {
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
