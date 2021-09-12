import { EntityAdminDto } from '@dark-rush-photography/shared/types';

const THREE_SIXTY_IMAGE_POST = 'ThreeSixtyImagePost';
const IMAGE_POST = 'ImagePost';

describe('createAdminImagePost', () => {
  beforeEach(() =>
    cy
      .authenticateApi()
      .then(() =>
        cy
          .findAllEntityAdmin(THREE_SIXTY_IMAGE_POST)
          .then(($body) =>
            $body.body.forEach((entityAdmin: EntityAdminDto) =>
              cy.deleteEntityAdmin(entityAdmin.type, entityAdmin.id)
            )
          )
      )
  );

  it('return application/json', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('create a three sixty image post', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .its('body.slug')
      .should('equal', 'test-three-sixty-image-post-1');
  });

  it('create multiple three sixty image posts', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .then(() =>
        cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
          slug: 'test-three-sixty-image-post-2',
        })
      )
      .then(() => cy.findAllEntityAdmin(THREE_SIXTY_IMAGE_POST))
      .its('body.length')
      .should('equal', 2);
  });

  it('create separate media process for different types', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .then(() =>
        cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      )
      .then(() => cy.findAllEntityAdmin(THREE_SIXTY_IMAGE_POST))
      .its('body.length')
      .should('equal', 1);
  });

  it('return a status of 201 when created', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .its('status')
      .should('equal', 201);
  });

  it('return a conflict status when already exists', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .then(() =>
        cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
          slug: 'test-three-sixty-image-post-1',
        })
      )
      .its('status')
      .should('equal', 409);
  });

  it('return a conflict status message when already exists', () => {
    cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
      slug: 'test-three-sixty-image-post-1',
    })
      .then(() =>
        cy.createMediaProcessAdmin(THREE_SIXTY_IMAGE_POST, {
          slug: 'test-three-sixty-image-post-1',
        })
      )
      .its('body.message')
      .should('equal', 'Entity already exists');
  });
});
