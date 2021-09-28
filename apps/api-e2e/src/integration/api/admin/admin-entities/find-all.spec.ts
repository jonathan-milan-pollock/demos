import {
  Entity,
  EntityWithGroupType,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import {
  getAuthHeaders,
  getAuthHeadersAdmin,
} from '../../../../support/commands/api/auth-headers.functions';

describe('findAll', () => {
  const entityWithoutGroupTypes = [
    EntityWithoutGroupType.About,
    EntityWithoutGroupType.BestOf,
    EntityWithoutGroupType.Destination,
    EntityWithoutGroupType.Favorites,
    EntityWithoutGroupType.ImagePost,
    EntityWithoutGroupType.ImageVideo,
    EntityWithoutGroupType.Review,
    EntityWithoutGroupType.ReviewMedia,
  ];

  const entityWithGroupTypes = [
    EntityWithGroupType.Event,
    EntityWithGroupType.PhotoOfTheWeek,
    EntityWithGroupType.SocialMedia,
  ];

  beforeEach(() =>
    cy.loginAdmin().then(() =>
      cy
        .findAllEntityAdmin(
          getAuthHeadersAdmin(),
          EntityWithoutGroupType.ImagePost
        )
        .then(($body) =>
          $body.body.forEach((entity: Entity) => {
            if (!entity.id) throw Error('Entity id is undefined');
            cy.deleteEntityAdmin(getAuthHeadersAdmin(), entity.type, entity.id);
          })
        )
    )
  );

  it('should return application/json', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityWithoutGroupType.About)
      .then((response) => response)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should find entities', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      title: 'test-image-post-1',
    }).then(() =>
      entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
        cy
          .findAllEntityAdmin(getAuthHeadersAdmin(), entityWithoutGroupType)
          .then((response) => response)
          .its('body.length')
          .should('be.greaterThan', 0)
      )
    );
  });

  it('should find image posts', () => {
    cy.createImagePostAdmin(getAuthHeadersAdmin(), {
      title: 'test-image-post-1',
    })
      .then(() =>
        cy.createImagePostAdmin(getAuthHeadersAdmin(), {
          title: 'test-image-post-2',
        })
      )
      .then(() =>
        cy.findAllEntityAdmin(
          getAuthHeadersAdmin(),
          EntityWithoutGroupType.ImagePost
        )
      )
      .then((response) => response)
      .its('body.length')
      .should('equal', 2);
  });

  it('should have a count of 0 when no entities for type are created', () => {
    cy.findAllEntityAdmin(
      getAuthHeadersAdmin(),
      EntityWithoutGroupType.ImagePost
    )
      .its('body.length')
      .should('equal', 0);
  });

  it('should return a status of 200 when finding entities', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityWithoutGroupType.About)
      .then((response) => response)
      .its('status')
      .should('equal', 200);
  });

  it('should return a bad request status when called for an entity that requires a group', () => {
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findAllEntityAdmin(getAuthHeadersAdmin(), entityWithGroupType)
        .then((response) => response)
        .its('status')
        .should('equal', 400)
    );
  });

  it('should return an unauthorized status if not logged in', () => {
    cy.findAllEntityAdmin({ Authorization: '' }, EntityWithoutGroupType.About)
      .then((response) => response)
      .its('status')
      .should('equal', 401);
  });

  it('should return an unauthorized message not logged in', () => {
    cy.findAllEntityAdmin({ Authorization: '' }, EntityWithoutGroupType.About)
      .then((response) => response)
      .its('body.message')
      .should('equal', 'Unauthorized');
  });

  it('should return an unauthorized status if not an admin', () => {
    cy.findAllEntityAdmin(getAuthHeaders(), EntityWithoutGroupType.About)
      .then((response) => response)
      .its('status')
      .should('equal', 401);
  });

  it('should return an unauthorized message if not an admin', () => {
    cy.findAllEntityAdmin(getAuthHeaders(), EntityWithoutGroupType.About)
      .then((response) => response)
      .its('body.message')
      .should('equal', 'Unauthorized');
  });
});
