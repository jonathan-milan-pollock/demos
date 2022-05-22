import { ConflictException } from '@nestjs/common';

import {
  EntityType,
  SitemapEntityType,
} from '@dark-rush-photography/shared/types';

const sitemapEntityTypeToEntityTypeMap = new Map<SitemapEntityType, EntityType>(
  [
    [SitemapEntityType.About, EntityType.About],
    [SitemapEntityType.Destination, EntityType.Destination],
    [SitemapEntityType.Event, EntityType.Event],
    [SitemapEntityType.Favorites, EntityType.Favorites],
    [SitemapEntityType.PhotoOfTheWeek, EntityType.PhotoOfTheWeek],
    [SitemapEntityType.Review, EntityType.Review],
    [SitemapEntityType.ReviewMedia, EntityType.ReviewMedia],
  ]
);

const sitemapEntityTypeLocationMap = new Map<SitemapEntityType, string>([
  [SitemapEntityType.About, 'https://darkrushphotography.com/about'],
  [
    SitemapEntityType.Destination,
    'https://darkrushphotography.com/destinations',
  ],
  [SitemapEntityType.Event, 'https://darkrushphotography.com/events'],
  [SitemapEntityType.Favorites, 'https://darkrushphotography.com'],
  [
    SitemapEntityType.PhotoOfTheWeek,
    'https://darkrushphotography.com/photo-of-the-week',
  ],
  [SitemapEntityType.Review, 'https://darkrushphotography.com/reviews'],
  [
    SitemapEntityType.ReviewMedia,
    'https://darkrushphotography.com/reviews/review',
  ],
]);

const sitemapEntityTypePriorityMap = new Map<SitemapEntityType, string>([
  [SitemapEntityType.About, '0.9'],
  [SitemapEntityType.Destination, '0.8'],
  [SitemapEntityType.Event, '0.9'],
  [SitemapEntityType.Favorites, '1.0'],
  [SitemapEntityType.PhotoOfTheWeek, '0.8'],
  [SitemapEntityType.Review, '0.9'],
  [SitemapEntityType.ReviewMedia, '0.8'],
]);

const sitemapEntityTypeChangeFrequencyMap = new Map<SitemapEntityType, string>([
  [SitemapEntityType.About, 'monthly'],
  [SitemapEntityType.Destination, 'weekly'],
  [SitemapEntityType.Event, 'daily'],
  [SitemapEntityType.Favorites, 'monthly'],
  [SitemapEntityType.PhotoOfTheWeek, 'weekly'],
  [SitemapEntityType.Review, 'monthly'],
  [SitemapEntityType.ReviewMedia, 'monthly'],
]);

export const getEntityTypeFromSitemapEntityType = (
  sitemapEntityType: SitemapEntityType
): EntityType => {
  const entityType = sitemapEntityTypeToEntityTypeMap.get(sitemapEntityType);
  if (!entityType)
    throw new ConflictException(
      `Could not get entity type for sitemap entity type ${sitemapEntityType}`
    );
  return entityType;
};

export const getSitemapEntityTypeLocation = (
  sitemapEntityType: SitemapEntityType
): string => {
  const sitemapLocation = sitemapEntityTypeLocationMap.get(sitemapEntityType);
  if (!sitemapLocation)
    throw new ConflictException(
      `Could not get location for sitemap entity type ${sitemapEntityType}`
    );
  return sitemapLocation;
};

export const getSitemapEntityTypePriority = (
  sitemapEntityType: SitemapEntityType
): string => {
  const sitemapPriority = sitemapEntityTypePriorityMap.get(sitemapEntityType);
  if (!sitemapPriority)
    throw new ConflictException(
      `Could not get priority for sitemap entity type ${sitemapEntityType}`
    );
  return sitemapPriority;
};

export const getSitemapEntityTypeChangeFrequency = (
  sitemapEntityType: SitemapEntityType
): string => {
  const sitemapChangeFrequency =
    sitemapEntityTypeChangeFrequencyMap.get(sitemapEntityType);
  if (!sitemapChangeFrequency)
    throw new ConflictException(
      `Could not get change frequency for sitemap entity type ${sitemapEntityType}`
    );
  return sitemapChangeFrequency;
};
