import { Event } from '@dark-rush-photography/shared/types';

export const getEventFacebookPost = (event: Event): string =>
  `
    ${event.title}
    More images at: https://www.darkrushphotography.com/events/${event.slug}
`;

export const getEventGoogleBusinessPost = (event: Event): string =>
  `
    ${event.title}

    ${event.description}

    More images at: https://www.darkrushphotography.com/events/${event.slug}
`;

export const getEventInstagramPost = (event: Event): string =>
  `
    ${event.title}
    More images at: https://www.darkrushphotography.com/events/${event.slug}

    @darkrushphotography
    #YourShotPhotographer
    ${event.keywords?.join('#').trimEnd()}
`;

export const getEventLinkedInPost = (event: Event): string =>
  `
    ${event.title}

    ${event.description}
    More images at: https://www.darkrushphotography.com/events/${event.slug}

    ${event.keywords?.join('#').trimEnd()}
`;

export const getEventYouTubePost = (event: Event): string =>
  `
    ${event.title}
    ${event.description}
    More images at: https://www.darkrushphotography.com/events/${event.slug}

    ${event.keywords?.join('#').trimEnd()}
`;
