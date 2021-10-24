import {
  Entity,
  Image,
  ImageExif,
  VideoExif,
} from '@dark-rush-photography/shared/types';
import { getExifDateFromIsoDate } from '@dark-rush-photography/api/util';

export const loadImageExif = (
  image: Image,
  entity: Entity,
  copyrightYear: number
): ImageExif => {
  const keywords = new Set([
    'Dark Rush Photography',
    'Photography',
    ...entity.seoKeywords,
  ]);

  if (image.seoKeywords) {
    const imageSeoKeywords = image.seoKeywords.split(',');
    imageSeoKeywords.forEach((imageSeoKeyword) =>
      keywords.add(imageSeoKeyword)
    );
  }

  let createdDateIso = image.createdDate ?? entity.createdDate;
  if (!createdDateIso) {
    createdDateIso = new Date().toISOString();
  }

  const publishedDateIso = entity.publishedDate ?? new Date().toISOString();

  return {
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
      LicensorURL: 'https://darkrushphotography.com',
    },
    'Iptc4xmpCore:Location': entity.location?.place ?? '',
    City: entity.location?.city ?? '',
    State: entity.location?.stateOrProvince ?? '',
    Country: entity.location?.country ?? '',
    Title: image.title ?? entity.title ?? '',
    'dc:description': image.seoDescription ?? entity.seoDescription ?? '',
    'Keywords+': [...keywords],
    CreateDate: getExifDateFromIsoDate(createdDateIso),
    'xmp:MetadataDate': getExifDateFromIsoDate(publishedDateIso),
    FileModifyDate: getExifDateFromIsoDate(publishedDateIso),
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
  };
};

export const loadImageVideoExif = (copyrightYear: number): VideoExif => ({
  author: 'Dark Rush Photography',
  year: copyrightYear,
  copyright: `© ${copyrightYear} Dark Rush Photography`,
});
