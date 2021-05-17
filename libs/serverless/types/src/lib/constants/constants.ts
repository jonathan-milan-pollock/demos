import { ImageArtistExif } from '../interfaces/image-artist-exif.interface';
import {
  LongestEdgeImageDimension,
  StandardImageDimension,
  TileImageDimension,
} from '@dark-rush-photography/serverless/types';

export const IMAGE_ARTIST_EXIF_FN = (year: number): ImageArtistExif => ({
  Rating: 5,
  Artist: 'Dark Rush',
  'dc:creator': 'Dark Rush',
  Creator: 'Dark Rush',
  'photoshop:credit': 'Dark Rush Photography',
  Credit: 'Dark Rush Photography',
  'xmp-plus:licensor': {
    LicensorName: 'Dark Rush Photography',
    LicensorCity: 'Atlanta',
    LicensorRegion: 'Georgia',
    LicensorCountry: 'United States',
    LicensorEmail: 'dark@darkrush.photo',
    LicensorTelephone1: '404-992-3275',
    LicensorTelephoneType1: 'Cell',
    LicensorURL: 'https://www.darkrushphotography.com',
  },
  'Keywords+': ['Dark Rush Photography', 'Photography'],
  AllDates: new Date().toISOString().slice(0, 10).replace('-', ':'),
  Copyrighted: true,
  'xmpRights:Marked': true,
  Copyright: `© ${year} Dark Rush Photography`,
  'dc:rights': `© ${year} Dark Rush Photography, All Rights Reserved`,
  CopyrightNotice: `© ${year} Dark Rush Photography, All Rights Reserved`,
  Licence:
    'Creative Commons Attribution-NoDerivatives 4.0 International License (https://creativecommons.org/licenses/by-nd/4.0/)',
  'xmpRights:WebStatement': 'https://creativecommons.org/licenses/by-nd/4.0/',
  Rights: `For Placement with Credit © ${year} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
  'xmpRights:UsageTerms': `For Placement with Credit © ${year} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
  XPComment: `For Placement with Credit © ${year} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
});

export const IMAGE_FIT_BACKGROUND_COLOR = '#FFF';

export const IMAGE_DIMENSIONS: (
  | LongestEdgeImageDimension
  | StandardImageDimension
  | TileImageDimension
)[] = [
  {
    type: 'Tile',
    minWidth: 512,
    minHeight: 256,
    longestEdge: 512,
  },
  {
    type: 'Thumbnail',
    longestEdge: 16,
  },
  {
    type: 'Small',
    longestEdge: 512,
  },
  {
    type: 'Medium',
    longestEdge: 1024,
  },
  {
    type: 'Large',
    longestEdge: 2048,
  },
  {
    type: 'ThreeSixtyThumbnail',
    longestEdge: 52,
  },
  {
    type: 'ThreeSixtySmall',
    longestEdge: 780,
  },
  {
    type: 'ThreeSixtyMedium',
    longestEdge: 1560,
  },
  {
    type: 'ThreeSixtyLarge',
    longestEdge: 3120,
  },
  {
    type: 'Facebook',
    width: 1200,
    height: 630,
    exactFit: false,
  },
  {
    type: 'GoogleBusiness',
    width: 1200,
    height: 900,
    exactFit: true,
  },
  {
    type: 'Instagram',
    width: 1080,
    height: 1080,
    exactFit: true,
  },
  {
    type: 'LinkedIn',
    width: 1200,
    height: 627,
    exactFit: true,
  },
  {
    type: 'Twitter',
    width: 1200,
    height: 627,
    exactFit: true,
  },
];
