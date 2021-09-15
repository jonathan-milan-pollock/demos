import { EntityAdminDto } from '@dark-rush-photography/api/types';

const IMAGE_POST = 'ImagePost';
const DUMMY_MONGODB_ID = '000000000000000000000000';

describe('findOneEntity', () => {
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
      .then(($body) => $body.body as EntityAdminDto)
      .then((entity) => cy.findOneEntityAdmin(IMAGE_POST, entity.id))
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('find a created entity', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(($body) => $body.body as EntityAdminDto)
      .then((entity) => cy.findOneEntityAdmin(IMAGE_POST, entity.id))
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('return a status of 200 when find an entity', () => {
    cy.createMediaProcessAdmin(IMAGE_POST, { slug: 'test-image-post-1' })
      .then(($body) => $body.body as EntityAdminDto)
      .then((entity) => cy.findOneEntityAdmin(IMAGE_POST, entity.id))
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
