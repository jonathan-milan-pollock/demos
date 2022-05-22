import { Entity } from '@dark-rush-photography/shared/types';

export const getPhotoOfTheWeekFacebookPost = (photoOfTheWeek: Entity): string =>
  `
    Photo of the Week
    ${photoOfTheWeek.title}
    ${photoOfTheWeek.location}
    https://darkrushphotography.com/photo-of-the-week/${photoOfTheWeek.slug}
    ${photoOfTheWeek.seoDescription}
    ${photoOfTheWeek.seoKeywords.join(', ').trimEnd()}
`;

export const getPhotoOfTheWeekInstagramPost = (
  photoOfTheWeek: Entity
): string =>
  `
    Photo of the Week
    ${photoOfTheWeek.title}
    ${photoOfTheWeek.seoDescription}
    ${photoOfTheWeek.location}
    https://darkrushphotography.com/${photoOfTheWeek.slug}

    @darkrushphotography
    #YourShotPhotographer
    ${photoOfTheWeek.seoKeywords.join('#').trimEnd()}
`;

export const getPhotoOfTheWeekLinkedInPost = (photoOfTheWeek: Entity): string =>
  `
    ${photoOfTheWeek.title}

    ${photoOfTheWeek.seoDescription}
    More images at: https://darkrushphotography.com/events/${
      photoOfTheWeek.slug
    }

    ${photoOfTheWeek.seoKeywords.join('#').trimEnd()}
`;
