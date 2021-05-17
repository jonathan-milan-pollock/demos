import {
  PublishServiceType,
  PublishedImage,
} from '@dark-rush-photography/serverless/types';

import {
  getAboutPublishedImage,
  getBestOfImagesPublishedImage,
  getDestinationsPublishedImage,
  getEventsPublishedImage,
  getHomePublishedImage,
  getPhotoOfTheWeekPublishedImage,
  getReviewPublishedImage,
  getReviewsPublishedImage,
  getSocialMediaPublishedImage,
} from './publish-service-image.functions';

export const getPublishedImageForUploadedImageFileNameSections = (
  uploadedImageFileNameSections: string[]
) => (
  publishServiceType: PublishServiceType
): E.Either<Error, PublishedImage> => {
  switch (publishServiceType) {
    case 'BestOfImages':
      return E.right(
        getBestOfImagesPublishedImage(uploadedImageFileNameSections)
      );
    case 'Home':
      return E.right(getHomePublishedImage(uploadedImageFileNameSections));
    case 'About':
      return E.right(getAboutPublishedImage(uploadedImageFileNameSections));
    case 'Reviews':
      return E.right(getReviewsPublishedImage(uploadedImageFileNameSections));
    case 'Review':
      return E.right(getReviewPublishedImage(uploadedImageFileNameSections));
    case 'PhotoOfTheWeek':
      return E.right(
        getPhotoOfTheWeekPublishedImage(uploadedImageFileNameSections)
      );
    case 'Events':
      return E.right(getEventsPublishedImage(uploadedImageFileNameSections));
    case 'Destinations':
      return E.right(
        getDestinationsPublishedImage(uploadedImageFileNameSections)
      );
    case 'SocialMedia':
      return E.right(
        getSocialMediaPublishedImage(uploadedImageFileNameSections)
      );
    default:
      return E.left(new Error());
  }
};

export const getPublishServiceName = (
  firstUploadedImageFileNameSection: string
): string =>
  firstUploadedImageFileNameSection.toLowerCase().replace(/\s+/g, '');

export const getPublishServiceType = (
  publishServiceName: string
): E.Either<Error, PublishServiceType> => {
  switch (publishServiceName) {
    case 'bestofimages':
      return E.right('BestOfImages');
    case 'home':
      return E.right('Home');
    case 'about':
      return E.right('About');
    case 'reviews':
      return E.right('Reviews');
    case 'review':
      return E.right('Reviews');
    case 'events':
      return E.right('Events');
    case 'photo-of-the-week':
      return E.right('PhotoOfTheWeek');
    case 'destinations':
      return E.right('Destinations');
    case 'socialmedia':
      return E.right('SocialMedia');
    default:
      return E.left(new Error());
  }
};
