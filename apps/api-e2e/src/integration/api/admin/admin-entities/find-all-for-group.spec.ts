import {
  EntityType,
  EntityWithGroupType,
} from '@dark-rush-photography/shared/types';
import {
  getAuthHeaders,
  getAuthHeadersAdmin,
} from '../../../../support/commands/api/auth-headers.functions';

describe('findAllForGroup', () => {
  const entityWithGroupTypes = [
    EntityWithGroupType.Event,
    EntityWithGroupType.PhotoOfTheWeek,
    EntityWithGroupType.SocialMedia,
  ];

  const entityWithoutGroupTypes = [
    EntityType.About,
    EntityType.BestOf,
    EntityType.Destination,
    EntityType.Favorites,
    EntityType.ImagePost,
    EntityType.ImageVideo,
    EntityType.Review,
    EntityType.ReviewMedia,
  ];

  beforeEach(() => cy.loginAdmin());

  it('should return application/json', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          getAuthHeadersAdmin(),
          EntityType.Event,
          group
        );
      })
      .then((response) => response)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should find entities with groups', () => {
    entityWithGroupTypes.forEach((entityWithGroupType) =>
      cy
        .findGroupsEntityAdmin(getAuthHeadersAdmin(), entityWithGroupType)
        .then((response) => {
          const group = response.body[0];
          return cy.findAllForGroupEntityAdmin(
            getAuthHeadersAdmin(),
            entityWithGroupType,
            group
          );
        })
        .then((response) => response)
        .its('body.length')
        .should('be.greaterThan', 0)
    );
  });

  it('should return a status of 200 when finding entities', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          getAuthHeadersAdmin(),
          EntityType.Event,
          group
        );
      })
      .then((response) => response)
      .its('status')
      .should('equal', 200);
  });

  it('should return a bad request status if called with invalid entity with group type', () => {
    entityWithoutGroupTypes.forEach((entityWithoutGroupType) =>
      cy
        .findGroupsEntityAdmin(getAuthHeadersAdmin(), entityWithoutGroupType)
        .then((response) => {
          const group = response.body[0];
          return cy.findAllForGroupEntityAdmin(
            getAuthHeadersAdmin(),
            entityWithoutGroupType,
            group
          );
        })
        .then((response) => response)
        .its('status')
        .should('equal', 400)
    );
  });

  it('should return an unauthorized status if not logged in', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          { Authorization: '' },
          EntityType.Event,
          group
        );
      })
      .then((response) => response)
      .its('status')
      .should('equal', 401);
  });

  it('should return an unauthorized message not logged in', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          { Authorization: '' },
          EntityType.Event,
          group
        );
      })
      .then((response) => response)
      .its('body.message')
      .should('equal', 'Unauthorized');
  });

  it('should return an unauthorized status if not an admin', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          getAuthHeaders(),
          EntityType.Event,
          group
        );
      })
      .then((response) => response)
      .its('body.message')
      .should('equal', 'Unauthorized');
  });

  it('should return an unauthorized message if not an admin', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) => {
        const group = response.body[0];
        return cy.findAllForGroupEntityAdmin(
          getAuthHeaders(),
          EntityType.Event,
          group
        );
      })
      .then((response) => response)
      .its('body.message')
      .should('equal', 'Unauthorized');
  });
});
