import { Entity } from '@dark-rush-photography/shared/types';

export const getEventFacebookPost = (event: Entity): string =>
  `
    ${event.title}
    More images at: https://darkrushphotography.com/events/${event.slug}
`;

export const getEventGoogleBusinessPost = (event: Entity): string =>
  `
    ${event.title}

    ${event.seoDescription}

    More images at: https://darkrushphotography.com/events/${event.slug}
`;

export const getEventInstagramPost = (event: Entity): string =>
  `
    ${event.title}
    More images at: https://darkrushphotography.com/events/${event.slug}

    @darkrushphotography
    #YourShotPhotographer
    ${event.seoKeywords?.join('#').trimEnd()}
`;

export const getEventLinkedInPost = (event: Entity): string =>
  `
    ${event.title}

    ${event.seoDescription}
    More images at: https://darkrushphotography.com/events/${event.slug}

    ${event.seoKeywords?.join('#').trimEnd()}
`;

export const getEventYouTubePost = (event: Entity): string =>
  `
    ${event.title}
    ${event.seoDescription}
    More images at: https://darkrushphotography.com/events/${event.slug}

    ${event.seoKeywords?.join('#').trimEnd()}
`;
