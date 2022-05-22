import * as faker from 'faker';

import {
  DUMMY_MONGODB_ID,
  EntityAdmin,
  EntityUpdate,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Update Admin Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  const entityUpdate: EntityUpdate = {
    isPublic: faker.datatype.boolean(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraphs(),
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
    starredImageIsCentered: faker.datatype.boolean(),
    tileDimension: {
      width: faker.datatype.number(),
      height: faker.datatype.number(),
    },
  };

  it('should update values', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body')
      .then((adminEntity: EntityAdmin) =>
        cy
          .updateAdminEntities(getAuthHeaders(), adminEntity.id, entityUpdate)
          .then(() => adminEntity)
      )
      .then((adminEntity: EntityAdmin) =>
        cy.findOneAdminEntities(getAuthHeaders(), adminEntity.id)
      )
      .its('body')
      .then((adminEntity) => {
        const {
          isPublic,
          title,
          text,
          createdDate,
          publishedDate,
          seoDescription,
          seoKeywords,
          location,
          starredImageIsCentered,
          tileDimension,
        } = adminEntity;
        return {
          isPublic,
          title,
          text,
          createdDate,
          publishedDate,
          seoDescription,
          seoKeywords,
          location,
          starredImageIsCentered,
          tileDimension,
        };
      })
      .should('deep.equal', entityUpdate));

  it('should return a status of 204 when update an entity', () =>
    cy
      .createTestAdminEntities(getAuthHeaders())
      .its('body')
      .then((adminEntity) =>
        cy.updateAdminEntities(getAuthHeaders(), adminEntity.id, entityUpdate)
      )
      .its('status')
      .should('equal', 204));

  it('should return a not found request status when cannot find an entity', () =>
    cy
      .updateAdminEntities(getAuthHeaders(), DUMMY_MONGODB_ID, {
        ...entityUpdate,
      })
      .its('status')
      .should('equal', 404));

  it('should return an unauthorized status when not authenticated', () =>
    cy
      .updateAdminEntities({ Authorization: '' }, DUMMY_MONGODB_ID, {})
      .its('status')
      .should('equal', 401));

  it('should return an unauthorized message when not authenticated', () =>
    cy
      .updateAdminEntities({ Authorization: '' }, DUMMY_MONGODB_ID, {})
      .its('body.message')
      .should('equal', 'Unauthorized'));
});
