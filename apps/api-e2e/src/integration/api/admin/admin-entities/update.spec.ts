import {
  DUMMY_MONGODB_ID,
  EntityMinimal,
  EntityType,
} from '@dark-rush-photography/shared/types';

import { getAuthHeadersAdmin } from '../../../../support/commands/api/auth-headers.functions';

describe('update', () => {
  beforeEach(() =>
    cy
      .loginAdmin()
      .then(() =>
        cy
          .findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.ImagePost)
          .then(($body) =>
            $body.body.forEach((entityMinimal: EntityMinimal) =>
              cy.deleteEntityAdmin(
                getAuthHeadersAdmin(),
                entityMinimal.type,
                entityMinimal.id
              )
            )
          )
      )
  );

  it('return application/json', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      title: 'test-image-post-1',
    })
      .then(($body) => $body.body as EntityMinimal)
      .then((entity) =>
        cy.findOneEntityAdmin(
          getAuthHeadersAdmin(),
          EntityType.ImagePost,
          entity.id
        )
      )
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('find a created entity', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      title: 'test-image-post-1',
    })
      .then(($body) => $body.body as EntityMinimal)
      .then((entity) =>
        cy.findOneEntityAdmin(
          getAuthHeadersAdmin(),
          EntityType.ImagePost,
          entity.id
        )
      )
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('return a status of 200 when find an entity', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      title: 'test-image-post-1',
    })
      .then(($body) => $body.body as EntityMinimal)
      .then((entity) =>
        cy.findOneEntityAdmin(
          getAuthHeadersAdmin(),
          EntityType.ImagePost,
          entity.id
        )
      )
      .its('status')
      .should('equal', 200);
  });

  it('return a not found request status when cannot find an entity', () => {
    cy.findOneEntityAdmin(
      getAuthHeadersAdmin(),
      EntityType.ImagePost,
      DUMMY_MONGODB_ID
    )
      .then((response) => response)
      .its('status')
      .should('equal', 404);
  });

  it('return a bad request status when provide the wrong type for the entity', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      title: 'test-image-post-1',
    })
      .then(($body) => $body.body as EntityMinimal)
      .then((entity) =>
        cy.findOneEntityAdmin(
          getAuthHeadersAdmin(),
          EntityType.About,
          entity.id
        )
      )
      .its('status')
      .should('equal', 400);
  });
});
