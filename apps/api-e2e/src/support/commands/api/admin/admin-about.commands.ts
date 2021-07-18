import { About, AboutUpdateDto } from '@dark-rush-photography/shared/types';
import { getAuthHeaders } from '../auth.functions';

Cypress.Commands.add(
  'createAboutAdmin',
  (slug: string): Cypress.Chainable<Cypress.Response<About>> =>
    cy.request({
      method: 'POST',
      url: '/api/v1/admin/about',
      headers: {
        ...getAuthHeaders(),
      },
      body: {
        slug,
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'updateAboutAdmin',
  (
    id: string,
    aboutUpdate: AboutUpdateDto
  ): Cypress.Chainable<Cypress.Response<About>> =>
    cy.request({
      method: 'PUT',
      url: `/api/v1/admin/about/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      body: { ...aboutUpdate },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'findAllAboutAdmin',
  (): Cypress.Chainable<Cypress.Response<About[]>> =>
    cy.request({
      method: 'GET',
      url: '/api/v1/admin/about',
      headers: {
        ...getAuthHeaders(),
      },
    })
);

Cypress.Commands.add(
  'findOneAboutAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<About>> =>
    cy.request({
      method: 'GET',
      url: `/api/v1/admin/about/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
      failOnStatusCode: false,
    })
);

Cypress.Commands.add(
  'deleteAboutAdmin',
  (id: string): Cypress.Chainable<Cypress.Response<void>> =>
    cy.request({
      method: 'DELETE',
      url: `/api/v1/admin/about/${id}`,
      headers: {
        ...getAuthHeaders(),
      },
    })
);
