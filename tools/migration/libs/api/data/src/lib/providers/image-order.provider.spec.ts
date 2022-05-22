/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import * as faker from 'faker';
import { of } from 'rxjs';

import {
  DUMMY_MONGODB_ID,
  ImageOrders,
} from '@dark-rush-photography/shared/types';
import { Document, DocumentModel } from '../schema/document.schema';

import { ImageOrderProvider } from './image-order.provider';

jest.mock('../entities/entity-repository.functions', () => ({
  ...jest.requireActual('../entities/entity-repository.functions'),
}));
import * as entityRepositoryFunctions from '../entities/entity-repository.functions';

jest.mock('../entities/entity-validation.functions', () => ({
  ...jest.requireActual('../entities/entity-validation.functions'),
}));
import * as entityValidationFunctions from '../entities/entity-validation.functions';

jest.mock('../images/image-repository.functions', () => ({
  ...jest.requireActual('../images/image-repository.functions'),
}));
import * as imageRepositoryFunctions from '../images/image-repository.functions';

describe('image-order.provider', () => {
  let imageOrderProvider: ImageOrderProvider;

  beforeEach(async () => {
    class MockDocumentModel {}

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Document.name),
          useClass: MockDocumentModel,
        },
        ImageOrderProvider,
      ],
    }).compile();

    imageOrderProvider = moduleRef.get<ImageOrderProvider>(ImageOrderProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('order$', () => {
    it('should order images', (done: any) => {
      const image1Id = faker.datatype.uuid();
      const image1Order = faker.datatype.number();
      const image2Id = faker.datatype.uuid();
      const image2Order = faker.datatype.number();

      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(
          of({
            images: [
              { id: image1Id, order: image1Order },
              { id: image2Id, order: image2Order },
            ],
          } as DocumentModel)
        );

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation((documentModel) => documentModel as DocumentModel);

      const mockedUpdateImageOrder$ = jest
        .spyOn(imageRepositoryFunctions, 'updateImageOrder$')
        .mockReturnValue(of({} as DocumentModel));

      imageOrderProvider
        .orderImages$(DUMMY_MONGODB_ID, {
          imageIdOrders: [
            { imageId: image1Id, order: image1Order },
            { imageId: image2Id, order: image2Order },
          ],
        } as ImageOrders)
        .subscribe(() => {
          expect(mockedFindEntityById$).toBeCalledTimes(2);
          expect(mockedValidateEntityFound).toBeCalledTimes(2);
          expect(mockedUpdateImageOrder$).toBeCalledTimes(2);
          const [imageFirst, imageFirstOrder] =
            mockedUpdateImageOrder$.mock.calls[0];
          expect(imageFirst.id).toBe(image1Id);
          expect(imageFirstOrder).toBe(image1Order);
          const [imageSecond, imageSecondOrder] =
            mockedUpdateImageOrder$.mock.calls[1];
          expect(imageSecond.id).toBe(image2Id);
          expect(imageSecondOrder).toBe(image2Order);
          done();
        });
    });

    it('should not order images if there are not any images to order', (done: any) => {
      const mockedFindEntityById$ = jest.spyOn(
        entityRepositoryFunctions,
        'findEntityById$'
      );

      const mockedValidateEntityFound = jest.spyOn(
        entityValidationFunctions,
        'validateEntityFound'
      );

      const mockedUpdateImageOrder$ = jest.spyOn(
        imageRepositoryFunctions,
        'updateImageOrder$'
      );

      imageOrderProvider
        .orderImages$(DUMMY_MONGODB_ID, {
          imageIdOrders: [],
        } as ImageOrders)
        .subscribe(() => {
          expect(mockedFindEntityById$).not.toBeCalled();
          expect(mockedValidateEntityFound).not.toBeCalled();
          expect(mockedUpdateImageOrder$).not.toBeCalled();
          done();
        });
    });

    it('should throw a not found exception when entity is not found', (done: any) => {
      const mockedFindEntityById$ = jest
        .spyOn(entityRepositoryFunctions, 'findEntityById$')
        .mockReturnValue(of(null));

      const mockedValidateEntityFound = jest
        .spyOn(entityValidationFunctions, 'validateEntityFound')
        .mockImplementation(() => {
          throw new NotFoundException();
        });

      const mockedUpdateImageOrder$ = jest.spyOn(
        imageRepositoryFunctions,
        'updateImageOrder$'
      );

      imageOrderProvider
        .orderImages$(DUMMY_MONGODB_ID, {
          imageIdOrders: [
            { imageId: faker.datatype.uuid(), order: faker.datatype.number() },
            { imageId: faker.datatype.uuid(), order: faker.datatype.number() },
          ],
        } as ImageOrders)
        .subscribe({
          next: () => {
            done();
          },
          error: (error) => {
            expect(mockedFindEntityById$).toBeCalledTimes(1);
            expect(mockedValidateEntityFound).toBeCalledTimes(1);
            expect(mockedUpdateImageOrder$).not.toBeCalled();
            expect(error).toBeInstanceOf(NotFoundException);
            done();
          },
          complete: () => {
            done();
          },
        });
    });
  });
});
