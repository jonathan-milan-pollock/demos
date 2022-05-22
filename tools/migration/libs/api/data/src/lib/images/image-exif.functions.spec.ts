/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as faker from 'faker';

import { Entity, Image } from '@dark-rush-photography/shared/types';
import { loadImageExif, loadImageVideoExif } from './image-exif.functions';

jest.mock('@dark-rush-photography/api/util', () => ({
  ...jest.requireActual('@dark-rush-photography/api/util'),
}));
import * as apiUtil from '@dark-rush-photography/api/util';

jest.mock('./image-load-exif.functions', () => ({
  ...jest.requireActual('./image-load-exif.functions'),
}));
import * as imageLoadExifFunctions from './image-load-exif.functions';

describe('image-exif.functions', () => {
  describe('loadImageExif', () => {
    const image = {
      title: faker.lorem.sentence(),
      createdDate: faker.date.recent().toISOString(),
      seoDescription: faker.lorem.sentences(),
      seoKeywords: [
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ].join(','),
    } as Image;

    const entity = {
      title: faker.lorem.sentence(),
      createdDate: faker.date.recent().toISOString(),
      publishedDate: faker.date.recent().toISOString(),
      seoDescription: faker.lorem.sentences(),
      seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      location: {
        place: faker.company.companyName(),
        city: faker.address.city(),
        stateOrProvince: faker.address.state(),
        country: faker.address.country(),
      },
    } as Entity;

    it('should load image exif with all values', () => {
      const seoKeywords = [
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.word(),
      ];
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageSeoKeywords')
        .mockReturnValue(seoKeywords);

      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageCreatedDate')
        .mockReturnValue(faker.date.recent().toISOString());

      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImagePublishedDate')
        .mockReturnValue(faker.date.recent().toISOString());

      jest
        .spyOn(apiUtil, 'getExifDateFromIsoDate')
        .mockReturnValue({} as string);

      const copyrightYear = faker.date.recent().getFullYear();
      const result = loadImageExif(image, entity, copyrightYear);

      const rights = `For Placement with Credit © ${copyrightYear} Dark Rush: www.darkrushphotography.com, all rights reserved.`;

      expect(result.Rating).toBe(5);
      expect(result.Artist).toBe('Dark Rush');
      expect(result['dc:creator']).toBe('Dark Rush');
      expect(result.Creator).toBe('Dark Rush');
      expect(result['photoshop:credit']).toBe('Dark Rush Photography');
      expect(result.Credit).toBe('Dark Rush Photography');
      expect(result['xmp-plus:licensor'].LicensorName).toBe(
        'Dark Rush Photography'
      );
      expect(result['xmp-plus:licensor'].LicensorCity).toBe('Atlanta');
      expect(result['xmp-plus:licensor'].LicensorRegion).toBe('Georgia');
      expect(result['xmp-plus:licensor'].LicensorCountry).toBe('United States');
      expect(result['xmp-plus:licensor'].LicensorEmail).toBe(
        'dark@darkrush.photo'
      );
      expect(result['xmp-plus:licensor'].LicensorTelephone1).toBe(
        '404.992.3275'
      );
      expect(result['xmp-plus:licensor'].LicensorTelephoneType1).toBe('Cell');
      expect(result['xmp-plus:licensor'].LicensorURL).toBe(
        'https://darkrushphotography.com'
      );
      expect(result['Iptc4xmpCore:Location']).toBe(entity.location!.place!);
      expect(result.City).toBe(entity.location!.city!);
      expect(result.State).toBe(entity.location!.stateOrProvince!);
      expect(result.Country).toBe(entity.location!.country);
      expect(result.Title).toBe(image.title!);
      expect(result['dc:description']).toBe(image.seoDescription!);
      expect(result['Keywords+']).toEqual(seoKeywords);
      expect(result.CreateDate).toBeDefined();
      expect(result['xmp:MetadataDate']).toBeDefined();
      expect(result.FileModifyDate).toBeDefined();
      expect(result.Copyrighted).toBe(true);
      expect(result['xmpRights:Marked']).toBe(true);
      expect(result.Copyright).toBe(`© ${copyrightYear} Dark Rush Photography`);
      expect(result.CopyrightNotice).toBe(
        `© ${copyrightYear} Dark Rush Photography, All Rights Reserved`
      );
      expect(result.Licence).toBe(
        'Creative Commons Attribution-NoDerivatives 4.0 International License (https://creativecommons.org/licenses/by-nd/4.0/)'
      );
      expect(result['xmpRights:WebStatement']).toBe(
        'https://creativecommons.org/licenses/by-nd/4.0/'
      );
      expect(result.Rights).toBe(rights);
      expect(result['xmpRights:UsageTerms']).toBe(rights);
      expect(result.XPComment).toBe(rights);
    });

    it('should load image exif with entity values for undefined image values', () => {
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageSeoKeywords')
        .mockReturnValue([] as string[]);

      const createdDate = faker.date.recent().toISOString();
      const publishedDate = faker.date.recent().toISOString();
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageCreatedDate')
        .mockReturnValue(createdDate);

      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImagePublishedDate')
        .mockReturnValue(publishedDate);

      jest
        .spyOn(apiUtil, 'getExifDateFromIsoDate')
        .mockReturnValue({} as string);

      const copyrightYear = faker.date.recent().getFullYear();
      const result = loadImageExif(
        { ...image, title: undefined, seoDescription: undefined },
        {
          ...entity,
        },
        copyrightYear
      );
      expect(result.Title).toBe(entity.title);
      expect(result['dc:description']).toBe(entity.seoDescription);
    });

    it('should load image exif with empty string values for undefined values', () => {
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageSeoKeywords')
        .mockReturnValue([] as string[]);

      const createdDate = faker.date.recent().toISOString();
      const publishedDate = faker.date.recent().toISOString();
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageCreatedDate')
        .mockReturnValue(createdDate);

      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImagePublishedDate')
        .mockReturnValue(publishedDate);

      jest
        .spyOn(apiUtil, 'getExifDateFromIsoDate')
        .mockReturnValue({} as string);

      const copyrightYear = faker.date.recent().getFullYear();
      const result = loadImageExif(
        { ...image, title: undefined, seoDescription: undefined },
        {
          ...entity,
          location: undefined,
          title: undefined,
          seoDescription: undefined,
        },
        copyrightYear
      );
      expect(result['Iptc4xmpCore:Location']).toBe('');
      expect(result.City).toBe('');
      expect(result.State).toBe('');
      expect(result.Country).toBe('');
      expect(result.Title).toBe('');
      expect(result['dc:description']).toBe('');
    });

    it('should load image exif with empty string values for undefined location values', () => {
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageSeoKeywords')
        .mockReturnValue([] as string[]);

      const createdDate = faker.date.recent().toISOString();
      const publishedDate = faker.date.recent().toISOString();
      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImageCreatedDate')
        .mockReturnValue(createdDate);

      jest
        .spyOn(imageLoadExifFunctions, 'loadExifImagePublishedDate')
        .mockReturnValue(publishedDate);

      jest
        .spyOn(apiUtil, 'getExifDateFromIsoDate')
        .mockReturnValue({} as string);

      const copyrightYear = faker.date.recent().getFullYear();
      const result = loadImageExif(
        { ...image },
        {
          ...entity,
          location: {
            place: undefined,
            city: undefined,
            stateOrProvince: undefined,
            country: 'United States',
          },
        },
        copyrightYear
      );
      expect(result['Iptc4xmpCore:Location']).toBe('');
      expect(result.City).toBe('');
      expect(result.State).toBe('');
    });
  });

  describe('loadImageVideoExif', () => {
    const entity = {
      title: faker.lorem.sentence(),
      seoDescription: faker.lorem.sentences(),
    } as Entity;

    it('should load image video exif with all values', () => {
      const copyrightYear = faker.date.recent().getFullYear();
      const result = loadImageVideoExif(entity, copyrightYear);

      expect(result.title).toBe(entity.title);
      expect(result.description).toBe(entity.seoDescription);
      expect(result.author).toBe('Dark Rush Photography');
      expect(result.year).toBe(copyrightYear);
      expect(result.copyright).toBe(`© ${copyrightYear} Dark Rush Photography`);
    });

    it('should load image video exif with empty string values for undefined values', () => {
      const copyrightYear = faker.date.recent().getFullYear();
      const result = loadImageVideoExif(
        {
          ...entity,
          title: undefined,
          seoDescription: undefined,
        },
        copyrightYear
      );
      expect(result.title).toBe('');
      expect(result.description).toBe('');
      expect(result.author).toBe('Dark Rush Photography');
      expect(result.year).toBe(copyrightYear);
      expect(result.copyright).toBe(`© ${copyrightYear} Dark Rush Photography`);
    });
  });
});
