import { ConflictException } from '@nestjs/common';

import { BestOfType } from '@dark-rush-photography/shared/types';

const slugToBestOfTypeMap = new Map<string, BestOfType>([
  ['children', BestOfType.Children],
  ['events', BestOfType.Events],
  ['landscapes', BestOfType.Landscapes],
  ['nature', BestOfType.Nature],
  ['real-estate', BestOfType.RealEstate],
]);

const bestOfTypeSitemapLocationMap = new Map<BestOfType, string>([
  [BestOfType.Children, 'https://37.photos/children'],
  [BestOfType.Events, 'https://37.photos/events'],
  [BestOfType.Landscapes, 'https://37.photos/landscapes'],
  [BestOfType.Nature, 'https://37.photos/nature'],
  [BestOfType.RealEstate, 'https://37.photos/real-estate'],
]);

const bestOfTypeSitemapPriorityMap = new Map<BestOfType, string>([
  [BestOfType.Children, '0.8'],
  [BestOfType.Events, '1.0'],
  [BestOfType.Landscapes, '0.8'],
  [BestOfType.Nature, '0.9'],
  [BestOfType.RealEstate, '0.9'],
]);

export const getBestOfTypeFromSlug = (slug: string): BestOfType => {
  const bestOfType = slugToBestOfTypeMap.get(slug);
  if (!bestOfType)
    throw new ConflictException(`Could not get best of type from slug ${slug}`);
  return bestOfType;
};

export const getBestOfTypeSitemapLocation = (
  bestOfType: BestOfType
): string => {
  const sitemapLocation = bestOfTypeSitemapLocationMap.get(bestOfType);
  if (!sitemapLocation)
    throw new ConflictException(
      `Could not get sitemap location for best of type ${bestOfType}`
    );
  return sitemapLocation;
};

export const getBestOfTypeSitemapPriority = (
  bestOfType: BestOfType
): string => {
  const sitemapPriority = bestOfTypeSitemapPriorityMap.get(bestOfType);
  if (!sitemapPriority)
    throw new ConflictException(
      `Could not get sitemap priority for best of type ${bestOfType}`
    );
  return sitemapPriority;
};
