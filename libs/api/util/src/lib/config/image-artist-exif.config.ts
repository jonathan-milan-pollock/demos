import { ImageArtistExif } from '@dark-rush-photography/shared/types';

export const GET_IMAGE_ARTIST_EXIF = (
  copyrightYear: number,
  exifDateCreated: string
): ImageArtistExif => ({
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
    LicensorTelephone1: '404.992.3275',
    LicensorTelephoneType1: 'Cell',
    LicensorURL: 'https://www.darkrushphotography.com',
  },
  'Keywords+': ['Dark Rush Photography', 'Photography'],
  CreateDate: exifDateCreated,
  'xmp:MetadataDate': exifDateCreated,
  FileModifyDate: exifDateCreated,
  Copyrighted: true,
  'xmpRights:Marked': true,
  Copyright: `© ${copyrightYear} Dark Rush Photography`,
  'dc:rights': `© ${copyrightYear} Dark Rush Photography, All Rights Reserved`,
  CopyrightNotice: `© ${copyrightYear} Dark Rush Photography, All Rights Reserved`,
  Licence:
    'Creative Commons Attribution-NoDerivatives 4.0 International License (https://creativecommons.org/licenses/by-nd/4.0/)',
  'xmpRights:WebStatement': 'https://creativecommons.org/licenses/by-nd/4.0/',
  Rights: `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
  'xmpRights:UsageTerms': `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
  XPComment: `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
});
