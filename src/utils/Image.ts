import Application from 'src/constants/Application';

export const findCacheBustingUrl = (imageUrl: string): string => {
    return `${imageUrl}?v=${Application.VERSION}`;
};
