/* eslint-disable @typescript-eslint/no-non-null-assertion */
import faker from '@faker-js/faker';

import {
  DUMMY_MONGODB_ID,
  ImageAdmin,
  ImageOrders,
  ImageState,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Order Images Admin Images', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should order images', () => {
    const firstImageOrder = faker.datatype.number({ min: 0 });
    const secondImageOrder = faker.datatype.number({ min: 0 });
    const thirdImageOrder = faker.datatype.number({ min: 0 });

    cy.createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) => {
        return cy
          .addTestImageAdminImages(getAuthHeaders(), entityId)
          .its('body.id')
          .then((firstImageId) => {
            return cy
              .addTestImageAdminImages(getAuthHeaders(), entityId)
              .its('body.id')
              .then((secondImageId) => {
                return cy
                  .addTestImageAdminImages(getAuthHeaders(), entityId)
                  .its('body.id')
                  .then((thirdImageId) => {
                    const imageOrders: ImageOrders = {
                      imageIdOrders: [
                        {
                          imageId: firstImageId,
                          order: firstImageOrder,
                        },
                        {
                          imageId: secondImageId,
                          order: secondImageOrder,
                        },
                        {
                          imageId: thirdImageId,
                          order: thirdImageOrder,
                        },
                      ],
                    };
                    return cy
                      .orderImagesAdminImages(
                        getAuthHeaders(),
                        entityId,
                        imageOrders
                      )
                      .then(() =>
                        cy.loadImagesAdminImages(getAuthHeaders(), entityId, {
                          imageStates: [ImageState.New],
                        })
                      )
                      .its('body')
                      .then((adminImages: ImageAdmin[]) => {
                        const firstAdminImage = adminImages.find(
                          (adminImage) => adminImage.id === firstImageId
                        );
                        expect(firstAdminImage!.order).equal(firstImageOrder);
                        const secondAdminImage = adminImages.find(
                          (adminImage) => adminImage.id === secondImageId
                        );
                        expect(secondAdminImage!.order).equal(secondImageOrder);
                        const thirdAdminImage = adminImages.find(
                          (adminImage) => adminImage.id === thirdImageId
                        );
                        expect(thirdAdminImage!.order).equal(thirdImageOrder);
                      });
                  });
              });
          });
      });
  });

  it('should return a status of 204 when ordering entities', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body.id')
      .then((entityId) =>
        cy.orderImagesAdminImages(getAuthHeaders(), entityId, {
          imageIdOrders: [
            { imageId: faker.datatype.uuid(), order: faker.datatype.number() },
          ],
        } as ImageOrders)
      )
      .its('status')
      .should('equal', 204));

  it('should return a not found request status when cannot find an entity', () =>
    cy
      .orderImagesAdminImages(getAuthHeaders(), DUMMY_MONGODB_ID, {
        imageIdOrders: [
          {
            imageId: faker.datatype.uuid(),
            order: faker.datatype.number({ min: 0 }),
          },
        ],
      })
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .orderImagesAdminImages({ Authorization: '' }, DUMMY_MONGODB_ID, {
        imageIdOrders: [],
      })
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .orderImagesAdminImages({ Authorization: '' }, DUMMY_MONGODB_ID, {
        imageIdOrders: [],
      })
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
