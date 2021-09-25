import { Entity, EntityType } from '@dark-rush-photography/shared/types';
import { getAuthHeadersAdmin } from '../../../../support/commands/api/auth-headers.functions';

describe('findAllEntities', () => {
  beforeEach(() =>
    cy.loginAdmin().then(() =>
      cy
        .findAllEntityAdmin(EntityType.ImagePost)
        .then(($body) =>
          $body.body.forEach((entity: Entity) => {
            if (!entity.id) throw Error('Entity id is undefined');
            cy.deleteEntityAdmin(entity.type, entity.id);
          })
        )
        .findAllEntityAdmin(EntityType.ImageVideo)
        .then(($body) =>
          $body.body.forEach((entity: Entity) => {
            if (!entity.id) throw Error('Entity id is undefined');
            cy.deleteEntityAdmin(entity.type, entity.id);
          })
        )
    )
  );

  it('return application/json', () => {
    cy.findAllEntityAdmin(EntityType.About)
      .then((response) => response)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('find about', () => {
    cy.findAllEntityAdmin(EntityType.About)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find best of', () => {
    cy.findAllEntityAdmin(EntityType.BestOf)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find destinations', () => {
    cy.findAllEntityAdmin(EntityType.Destination)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find events for the first group', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.Event)
      .then((response) =>
        cy.findAllEntityAdmin(EntityType.Event, response.body[0])
      )
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find favorites', () => {
    cy.findAllEntityAdmin(EntityType.Favorites)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find image posts', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(() => cy.createImagePostAdmin({ slug: 'test-image-post-2' }))
      .then(() => cy.findAllEntityAdmin(EntityType.ImagePost))
      .then((response) => response)
      .its('body.length')
      .should('equal', 2);
  });

  it('find image videos', () => {
    cy.findAllEntityAdmin(EntityType.ImageVideo)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find photo of the week for the first group', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.PhotoOfTheWeek)
      .then((response) =>
        cy.findAllEntityAdmin(EntityType.PhotoOfTheWeek, response.body[0])
      )
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find review media', () => {
    cy.findAllEntityAdmin(EntityType.ReviewMedia)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find reviews', () => {
    cy.findAllEntityAdmin(EntityType.Review)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find social media for the first group', () => {
    cy.findGroupsEntityAdmin(getAuthHeadersAdmin(), EntityType.SocialMedia)
      .then((response) =>
        cy.findAllEntityAdmin(EntityType.SocialMedia, response.body[0])
      )
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('should find all created image posts', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(() => cy.createImagePostAdmin({ slug: 'test-image-post-2' }))
      .then(() => cy.findAllEntityAdmin(EntityType.ImagePost))
      .its('body.length')
      .should('equal', 2);
  });

  it('should have a count of 0 when no entities for type are created', () => {
    cy.findAllEntityAdmin(EntityType.ImagePost)
      .its('body.length')
      .should('equal', 0);
  });

  it('return a status of 200 when finding entities', () => {
    cy.findAllEntityAdmin(EntityType.About)
      .then((response) => response)
      .its('status')
      .should('equal', 200);
  });

  it('return a bad request status when called without a group for entity with groups', () => {
    cy.findAllEntityAdmin(EntityType.Event)
      .then((response) => response)
      .its('status')
      .should('equal', 400);
  });

  it('return a bad request message when called without a group for entity with groups', () => {
    cy.findAllEntityAdmin(EntityType.Event)
      .then((response) => response)
      .its('body.message')
      .should('equal', 'A group must be provided');
  });
});
