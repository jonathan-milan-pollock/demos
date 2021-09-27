import { Entity, EntityType } from '@dark-rush-photography/shared/types';
import { getAuthHeadersAdmin } from '../../../../support/commands/api/auth-headers.functions';

describe('findAll', () => {
  const entityTypesInGoogleDrive = [
    EntityType.About,
    EntityType.BestOf,
    EntityType.Destination,
    EntityType.Favorites,
    EntityType.ImageVideo,
    EntityType.Review,
    EntityType.ReviewMedia,
  ];

  const entityTypesWithGroup = [
    EntityType.Event,
    EntityType.PhotoOfTheWeek,
    EntityType.SocialMedia,
  ];

  beforeEach(() =>
    cy.loginAdmin().then(() =>
      cy
        .findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.ImagePost)
        .then(($body) =>
          $body.body.forEach((entity: Entity) => {
            if (!entity.id) throw Error('Entity id is undefined');
            cy.deleteEntityAdmin(entity.type, entity.id);
          })
        )
    )
  );

  it('should return application/json', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.About)
      .then((response) => response)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should find entities', () => {
    entityTypesInGoogleDrive.forEach((entityType) =>
      cy
        .findAllEntityAdmin(getAuthHeadersAdmin(), entityType)
        .then((response) => response)
        .its('body.length')
        .should('be.greaterThan', 0)
    );
  });

  it('should find image posts', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(() => cy.createImagePostAdmin({ slug: 'test-image-post-2' }))
      .then(() =>
        cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.ImagePost)
      )
      .then((response) => response)
      .its('body.length')
      .should('equal', 2);
  });

  it('should have a count of 0 when no entities for type are created', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.ImagePost)
      .its('body.length')
      .should('equal', 0);
  });

  it('should return a status of 200 when finding entities', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.About)
      .then((response) => response)
      .its('status')
      .should('equal', 200);
  });

  it('should return a bad request status when called without a group for entity with groups', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => response)
      .its('status')
      .should('equal', 400);
  });

  it('should return a bad request message when called without a group for entity with groups', () => {
    cy.findAllEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => response)
      .its('body.message')
      .should('equal', 'A group must be provided');
  });
});
