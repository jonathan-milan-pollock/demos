import { ImageArtistExif } from '@dark-rush-photography/serverless/types';

export const getImageArtistExifConfig = (year: number): ImageArtistExif => ({
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
