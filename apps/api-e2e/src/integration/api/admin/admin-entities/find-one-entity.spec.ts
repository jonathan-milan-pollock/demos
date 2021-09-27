import {
  DUMMY_MONGODB_ID,
  Entity,
  EntityType,
} from '@dark-rush-photography/shared/types';

import { getAuthHeadersAdmin } from '../../../../support/commands/api/auth-headers.functions';

describe('findOneEntity', () => {
  beforeEach(() =>
    cy
      .loginAdmin()
      .then(() =>
        cy
          .findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.ImagePost)
          .then(($body) =>
            $body.body.forEach((entity: Entity) =>
              cy.deleteEntityAdmin(entity.type, entity.id!)
            )
          )
      )
  );

  it('return application/json', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(($body) => $body.body as Entity)
      .then((entity) => cy.findOneEntityAdmin(IMAGE_POST, entity.id!))
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('find a created entity', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(($body) => $body.body as Entity)
      .then((entity) => cy.findOneEntityAdmin(IMAGE_POST, entity.id!))
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('return a status of 200 when find an entity', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(($body) => $body.body as Entity)
      .then((entity) => cy.findOneEntityAdmin(IMAGE_POST, entity.id!))
      .its('status')
      .should('equal', 200);
  });

  it('return a not found request status when cannot find an entity', () => {
    cy.findOneEntityAdmin(IMAGE_POST, DUMMY_MONGODB_ID)
      .then((response) => response)
      .its('status')
      .should('equal', 404);
  });

  it('return a not found message when called without a group for entity with groups', () => {
    cy.findOneEntityAdmin(IMAGE_POST, DUMMY_MONGODB_ID)
      .then((response) => response)
      .its('body.message')
      .should('equal', 'Entity was not found');
  });
});
