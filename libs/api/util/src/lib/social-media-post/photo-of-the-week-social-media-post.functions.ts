import { PhotoOfTheWeek } from '@dark-rush-photography/shared/types';

export const getPhotoOfTheWeekFacebookPost = (
  photoOfTheWeek: PhotoOfTheWeek
): string =>
  `
    Photo of the Week
    ${photoOfTheWeek.title}
    ${photoOfTheWeek.location}
    https://www.darkrushphotography.com/photo-of-the-week/${photoOfTheWeek.slug}
    ${photoOfTheWeek.description}
    ${photoOfTheWeek.seoKeywords.join(', ').trimEnd()}
`;

export const getPhotoOfTheWeekInstagramPost = (
  photoOfTheWeek: PhotoOfTheWeek
): string =>
  `
    Photo of the Week
    ${photoOfTheWeek.title}
    ${photoOfTheWeek.description}
    ${photoOfTheWeek.location}
    https://www.darkrushphotography.com/${photoOfTheWeek.slug}

    @darkrushphotography
    #YourShotPhotographer
    ${photoOfTheWeek.seoKeywords.join('#').trimEnd()}
`;

export const getPhotoOfTheWeekLinkedInPost = (
  photoOfTheWeek: PhotoOfTheWeek
): string =>
  `
    ${photoOfTheWeek.title}

    ${photoOfTheWeek.description}
    More images at: https://www.darkrushphotography.com/events/${
      photoOfTheWeek.slug
    }

    ${photoOfTheWeek.seoKeywords.join('#').trimEnd()}
`;
