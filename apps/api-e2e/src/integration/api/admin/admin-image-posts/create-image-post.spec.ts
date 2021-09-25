import { Entity, EntityType } from '@dark-rush-photography/shared/types';

describe('createImagePost', () => {
  beforeEach(() =>
    cy.loginAdmin().then(() =>
      cy.findAllEntityAdmin(EntityType.ImagePost).then(($body) => {
        $body.body.forEach((entityAdmin: Entity) =>
          cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id!)
        );
      })
    )
  );

  it('return application/json', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('create an image post', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('create multiple image posts', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(() => cy.createImagePostAdmin({ slug: 'test-image-post-2' }))
      .then(() => cy.findAllEntityAdmin(IMAGE_POST))
      .its('body.length')
      .should('equal', 2);
  });

  it('return a status of 201 when created', () => {
    cy.createImagePostAdmin({
      slug: 'test-image-post-1',
    })
      .its('status')
      .should('equal', 201);
  });

  it('return a conflict status when already exists', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(() => cy.createImagePostAdmin({ slug: 'test-image-post-1' }))
      .its('status')
      .should('equal', 409);
  });

  it('return a conflict status message when already exists', () => {
    cy.createImagePostAdmin({ slug: 'test-image-post-1' })
      .then(() => cy.createImagePostAdmin({ slug: 'test-image-post-1' }))
      .its('body.message')
      .should('equal', 'Entity already exists');
  });
});
