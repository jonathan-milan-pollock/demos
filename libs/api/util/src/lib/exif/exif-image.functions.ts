/* eslint-disable @typescript-eslint/no-var-requires */
import { concatMap, from, map, Observable } from 'rxjs';

import { ImageExif, Location } from '@dark-rush-photography/shared/types';

export const loadImageExif = (
  location: Location,
  dateCreated: string,
  datePublished: string,
  title: string,
  seoDescription: string,
  seoKeywords: string[],
  copyrightYear: number
): ImageExif => {
  const keywords = new Set([
    'Dark Rush Photography',
    'Photography',
    ...seoKeywords,
  ]);

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
    'Iptc4xmpCore:Location': location.place ?? '',
    City: location.city ?? '',
    State: location.stateOrProvince ?? '',
    Country: location.country ?? '',
    Title: title,
    'dc:description': seoDescription,
    'Keywords+': [...keywords],
    CreateDate: dateCreated,
    'xmp:MetadataDate': datePublished,
    FileModifyDate: datePublished,
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

export const exifImage$ = (
  filePath: string,
  imageExif: ImageExif
): Observable<void> => {
  const exiftool = require('node-exiftool');
  const exiftoolBin = require('dist-exiftool');
  const ep = new exiftool.ExiftoolProcess(exiftoolBin);

  return from(ep.open()).pipe(
    concatMap(() =>
      from(
        ep.writeMetadata(
          filePath,
          {
            ...imageExif,
          },
          ['overwrite_original', 'codedcharacterset=utf8']
        )
      )
    ),
    concatMap(() => from(ep.close())),
    map(() => undefined)
  );
};
