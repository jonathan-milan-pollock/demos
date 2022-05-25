import {
  Entity,
  ImageDimensionType,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getImageUrl } from '@dark-rush-photography/shared/util';

export const loadJsonLdEventCreatedDate = (
  date: Date,
  eventCreatedDate?: string
): string => eventCreatedDate ?? date.toISOString();

export const loadJsonLdEventImageUrls = (
  event: Entity,
  isProduction: boolean
): string[] =>
  event.images
    .filter(
      (image) =>
        image.state === ImageState.Public && (image.isStarred || image.isLoved)
    )
    .map((image) =>
      getImageUrl(
        image.storageId,
        image.pathname,
        ImageDimensionType.JsonLd,
        isProduction
      )
    );
