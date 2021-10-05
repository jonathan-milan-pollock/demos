import * as faker from 'faker';

import {
  EntityMinimalAdmin,
  EntityWithoutGroupType,
} from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Create Admin Image Post', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  it('should return application/json', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      slug: 'test-image-post-1',
    })
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create an image post with the correct title', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      slug: 'test-image-post-1',
      text: [
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
      ],
    })
      .its('body.slug')
      .should('equal', 'test-image-post-1');
  });

  it('should create an image post with the correct text', () => {
    const text = [
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
      faker.lorem.paragraph(),
    ];

    cy.createImagePostAdmin(getAuthHeaders(), {
      slug: 'test-image-post-1',
      text,
    })
      .then((response) => response.body as EntityMinimalAdmin)
      .then((entityMinimalAdmin) =>
        cy.findOneEntityAdmin(getAuthHeaders(), entityMinimalAdmin.id)
      )
      .its('body.text')
      .should('deep.equal', text);
  });

  it('should create multiple image posts', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      slug: 'test-image-post-1',
    })
      .then(() =>
        cy.createImagePostAdmin(getAuthHeaders(), {
          slug: 'test-image-post-2',
        })
      )
      .then(() =>
        cy.findAllEntityAdmin(
          getAuthHeaders(),
          EntityWithoutGroupType.ImagePost
        )
      )
      .its('body.length')
      .should('equal', 2);
  });

  it('should return a status of 201 when created', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      slug: 'test-image-post-1',
    })
      .its('status')
      .should('equal', 201);
  });

  it('should return a conflict status when already exists', () => {
    cy.createImagePostAdmin(getAuthHeaders(), {
      slug: 'test-image-post-1',
    })
      .then(() =>
        cy.createImagePostAdmin(getAuthHeaders(), {
          slug: 'test-image-post-1',
        })
      )
      .its('status')
      .should('equal', 409);
  });

  it('should return an unauthorized message when not logged in', () => {
    cy.createImagePostAdmin(
      { Authorization: '' },
      {
        slug: 'test-image-post-1',
      }
    )
      .its('body.message')
      .should('equal', 'Unauthorized');
  });
});
