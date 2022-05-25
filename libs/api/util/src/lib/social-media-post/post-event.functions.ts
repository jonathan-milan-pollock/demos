import { Entity } from '@dark-rush-photography/shared/types';

export const getEventFacebookPost = (event: Entity): string =>
  `
    ${event.title}
    More images at: https://darkrushphotography.com/events/${event.pathname}
`;

export const getEventGoogleBusinessPost = (event: Entity): string =>
  `
    ${event.title}

    ${event.seoDescription}

    More images at: https://darkrushphotography.com/events/${event.pathname}
`;

export const getEventInstagramPost = (event: Entity): string =>
  `
    ${event.title}
    More images at: https://darkrushphotography.com/events/${event.pathname}

    @darkrushphotography
    #YourShotPhotographer
    ${event.seoKeywords?.join('#').trimEnd()}
`;

export const getEventLinkedInPost = (event: Entity): string =>
  `
    ${event.title}

    ${event.seoDescription}
    More images at: https://darkrushphotography.com/events/${event.pathname}

    ${event.seoKeywords?.join('#').trimEnd()}
`;

export const getEventYouTubePost = (event: Entity): string =>
  `
    ${event.title}
    ${event.seoDescription}
    More images at: https://darkrushphotography.com/events/${event.pathname}

    ${event.seoKeywords?.join('#').trimEnd()}
`;
