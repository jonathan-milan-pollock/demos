import {
  Entity,
  Image,
  ImageExif,
  VideoExif,
} from '@dark-rush-photography/shared/types';
import { getExifDateFromIsoDate } from '@dark-rush-photography/api/util';
import {
  loadExifImageCreatedDate,
  loadExifImagePublishedDate,
  loadExifImageSeoKeywords,
} from './image-load-exif.functions';

export const loadImageExif = (
  image: Image,
  entity: Entity,
  copyrightYear: number
): ImageExif => ({
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
  'Keywords+': [
    ...loadExifImageSeoKeywords(entity.seoKeywords, image.seoKeywords),
  ],
  CreateDate: getExifDateFromIsoDate(
    loadExifImageCreatedDate(new Date(), entity.createdDate, image.createdDate)
  ),
  'xmp:MetadataDate': getExifDateFromIsoDate(
    loadExifImagePublishedDate(new Date(), entity.publishedDate)
  ),
  FileModifyDate: getExifDateFromIsoDate(
    loadExifImagePublishedDate(new Date(), entity.publishedDate)
  ),
  Copyrighted: true,
  'xmpRights:Marked': true,
  Copyright: `© ${copyrightYear} Dark Rush Photography`,
  CopyrightNotice: `© ${copyrightYear} Dark Rush Photography, All Rights Reserved`,
  Licence:
    'Creative Commons Attribution-NoDerivatives 4.0 International License (https://creativecommons.org/licenses/by-nd/4.0/)',
  'xmpRights:WebStatement': 'https://creativecommons.org/licenses/by-nd/4.0/',
  Rights: `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
  'xmpRights:UsageTerms': `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
  XPComment: `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`,
});

export const loadImageVideoExif = (
  title: string,
  description: string,
  copyrightYear: number
): VideoExif => ({
  title,
  description,
  author: 'Dark Rush Photography',
  year: copyrightYear,
  copyright: `© ${copyrightYear} Dark Rush Photography`,
});
