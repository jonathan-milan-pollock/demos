import { JsonLdList } from '@dark-rush-photography/shared/types';

export const findEventsJsonLd = (eventSlugs: string[]): string => {
  const eventsJsonLd: JsonLdList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: eventSlugs.map((eventSlug, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://darkrushphotography.com/events/${eventSlug}`,
    })),
  };
  return JSON.stringify(eventsJsonLd);
};
