import { EntityAdminDto } from '@dark-rush-photography/api/types';

const IMAGE_POST = 'ImagePost';
const IMAGE_VIDEO = 'ImageVideo';

describe('createImagePost', () => {
  beforeEach(() =>
    cy
      .loginAdmin()
      .then(() =>
        cy
          .findAllEntityAdmin(IMAGE_POST)
          .then(($body) =>
            $body.body.forEach((entityAdmin: EntityAdminDto) =>
              cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id)
            )
          )
      )
  );

  it('return application/json', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('create an image post', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('create multiple image posts', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-2' })
      )
      .then(() => cy.findAllEntityAdmin(IMAGE_POST))
      .its('body.length')
      .should('equal', 2);
  });

  it('create separate media process for different types', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_VIDEO, { slug: 'test-image-video-1' })
      )
      .then(() => cy.findAllEntityAdmin(IMAGE_POST))
      .its('body.length')
      .should('equal', 1);
  });

  it('return a status of 201 when created', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, {
      slug: 'test-image-post-1',
    })
      .its('status')
      .should('equal', 201);
  });

  it('return a conflict status when already exists', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      )
      .its('status')
      .should('equal', 409);
  });

  it('return a conflict status message when already exists', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      )
      .its('body.message')
      .should('equal', 'Entity already exists');
  });
});
