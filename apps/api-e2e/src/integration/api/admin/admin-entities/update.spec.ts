import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityMinimalAdmin,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Update Admin Entities', () => {
  const entityUpdate: EntityUpdate = {
    slug: `test-${faker.lorem.word()}`,
    order: faker.datatype.number({ min: 0 }),
    title: faker.lorem.sentence(),
    seoDescription: faker.lorem.sentences(),
    seoKeywords: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
    dateCreated: faker.date.recent().toISOString(),
    datePublished: faker.date.recent().toISOString(),
    location: {
      place: faker.company.companyName(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      stateOrProvince: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
    },
    starredImageIsCentered: faker.datatype.boolean(),
    text: [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ],
    isPublic: faker.datatype.boolean(),
  };

  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should update values', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy
          .updateEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id, {
            ...entityUpdate,
          })
          .then(() => entityMinimalAdmin)
      )
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .then((response) => {
        const {
          slug,
          order,
          title,
          seoDescription,
          seoKeywords,
          dateCreated,
          datePublished,
          location,
          starredImageIsCentered,
          text,
          isPublic,
        } = response.body;
        return {
          slug,
          order,
          title,
          seoDescription,
          seoKeywords,
          dateCreated,
          datePublished,
          location,
          starredImageIsCentered,
          text,
          isPublic,
        };
      })
      .should('deep.equal', entityUpdate));

  it('should return a status of 204 when update an entity', () =>
    cy
      .createImagePostAdmin(getAuthHeaders(), {
        slug: 'test-image-post-1',
      })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.updateEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id, {
          ...entityUpdate,
        })
      )
      .its('status')
      .should('equal', 204));

  it('should return a not found request status when cannot find an entity', () =>
    cy
      .updateEntityAdmin(getAuthHeaders(), DUMMY_MONGODB_ID, {
        ...entityUpdate,
      })
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not logged in', () =>
    cy
      .updateEntityAdmin({ Authorization: '' }, DUMMY_MONGODB_ID, {})
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not logged in', () =>
    cy
      .updateEntityAdmin({ Authorization: '' }, DUMMY_MONGODB_ID, {})
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
