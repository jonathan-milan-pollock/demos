import { SocialMedia } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createSocialMediaAdmin',
  (
    group: string,
    slug: string
  ): Cypress.Chainable<Cypress.Response<SocialMedia>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/social-media',
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        group,
        slug,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllSocialMediaAdmin',
  (): Cypress.Chainable<Cypress.Response<SocialMedia[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/social-media',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneSocialMediaAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<SocialMedia>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/social-media/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteSocialMediaAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/social-media/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
