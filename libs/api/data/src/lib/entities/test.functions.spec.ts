import * as faker from 'faker';

import { Location } from '@dark-rush-photography/shared/types';

const mockLocation = (): Location => ({
  place: faker.company.companyName(),
  street: faker.address.streetAddress(),
  stateOrProvince: faker.address.state(),
  zipCode: faker.address.zipCode(),
  country: faker.address.country(),
});

const mockDestinationUpdate = () => ({
  slug: faker.lorem.word().toLowerCase(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: [faker.lorem.word(), faker.lorem.word()],
  datePublished: faker.date.recent().toISOString(),
  location: { ...mockLocation() },
  tileImageIsCentered: faker.datatype.boolean(),
  text: [faker.lorem.paragraph(), faker.lorem.paragraph()],
  isPosted: faker.datatype.boolean(),
});

const mockEventUpdate = () => ({
  group: faker.date.soon().getFullYear().toString(),
  slug: faker.lorem.word().toLowerCase(),
  title: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  keywords: [faker.lorem.word(), faker.lorem.word()],
  dateCreated: faker.date.recent().toISOString(),
  datePublished: faker.date.recent().toISOString(),
  location: { ...mockLocation() },
  tileImageIsCentered: faker.datatype.boolean(),
  text: [faker.lorem.paragraph(), faker.lorem.paragraph()],
});

const mockEventCreate = () => ({
  group: faker.date.soon().getFullYear().toString(),
  slug: faker.lorem.word().toLowerCase(),
});

describe('about.functions', () => {
  describe('fromDocumentModel', () => {
    /*it('should set id from document model', () => {
      const documentId = '0001';
      const result = fromDocumentModel({
        ...documentModel,
        _id: documentId,
      });
      expect(result.id).toBe(documentId);
    });

    it('should set all fields from document model', () => {
      const documentId = '0001';
      const result = fromDocumentModel({
        ...documentModel,
        _id: documentId,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...about } = documentModel;
      expect(result).toEqual({ ...about, id: documentId });
    });*/
  });
});
