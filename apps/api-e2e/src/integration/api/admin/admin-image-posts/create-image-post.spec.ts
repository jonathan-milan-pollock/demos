import {
  EntityMinimal,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeadersAdmin } from '../../../../support/commands/api/auth-headers.functions';

describe('createImagePost', () => {
  beforeEach(() =>
    cy.loginAdmin().then(() =>
      cy
        .findAllEntityAdmin(
          getAuthHeadersAdmin(),
          EntityWithoutGroupType.ImagePost
        )
        .then(($body) => {
          $body.body.forEach((entityMinimal: EntityMinimal) =>
            cy.deleteEntityAdmin(
              getAuthHeadersAdmin(),
              entityMinimal.type,
              entityMinimal.id
            )
          );
        })
    )
  );

  it('return application/json', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      slug: 'test-image-post-1',
    })
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('create an image post', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      slug: 'test-image-post-1',
    })
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('create multiple image posts', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      slug: 'test-image-post-1',
    })
      .then(() =>
        cy.createImagePostAdmin(getAuthHeadersAdmin(), {
          slug: 'test-image-post-2',
        })
      )
      .then(() =>
        cy.findAllEntityAdmin(
          getAuthHeadersAdmin(),
          EntityWithoutGroupType.ImagePost
        )
      )
      .its('body.length')
      .should('equal', 2);
  });

  it('return a status of 201 when created', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      slug: 'test-image-post-1',
    })
      .its('status')
      .should('equal', 201);
  });

  it('return a conflict status when already exists', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      slug: 'test-image-post-1',
    })
      .then(() =>
        cy.createImagePostAdmin(getAuthHeadersAdmin(), {
          slug: 'test-image-post-1',
        })
      )
      .its('status')
      .should('equal', 409);
  });
});
