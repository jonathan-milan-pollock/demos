import {
  DUMMY_MONGODB_ID,
  FAVORITES_SLUG,
} from '@dark-rush-photography/shared-types';

describe('Admin Favorites API', () => {
  const authorization = '';

  const create = () =>
    cy.request({
      method: 'POST',
      url: '/api/admin/v1/favorites',
      headers: {
        Authorization: authorization,
      },
    });

  const findOne = () =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/favorites`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  const deleteFavorites = (id: string) => {
    return cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/favorites/${id}`,
      headers: {
        Authorization: authorization,
      },
    });
  };

  beforeEach(() => {
    findOne().then(($body) => {
      if ($body.status === 200) return deleteFavorites($body.body.id);
    });
  });

  it('should return application/json', () => {
    create()
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create favorites', () => {
    create().its('body.slug').should('equal', FAVORITES_SLUG);
  });

  it('should return existing favorites when create more than once', () => {
    create()
      .then(() => create())
      .its('body.slug')
      .should('equal', FAVORITES_SLUG);
  });

  it('should only create one favorites for the same slug', () => {
    create()
      .then(() => create())
      .then(() => findOne())
      .its('body.slug')
      .should('equal', FAVORITES_SLUG);
  });

  it('should find one favorites', () => {
    create()
      .its('body.id')
      .then(() => findOne())
      .its('body.slug')
      .should('equal', FAVORITES_SLUG);
  });

  it('should not find an favorites that does not exist', () => {
    findOne().its('status').should('equal', 404);
  });

  it('should delete the favorites', () => {
    create()
      .its('body.id')
      .then((id) => deleteFavorites(id))
      .then(() => findOne())
      .its('status')
      .should('equal', 404);
  });

  it('should return a status of 204 when delete', () => {
    create()
      .its('body.id')
      .then((id) => deleteFavorites(id))
      .its('status')
      .should('equal', 204);
  });

  it('should return an empty body when delete', () => {
    create()
      .its('body.id')
      .then((id) => deleteFavorites(id))
      .its('body')
      .should('equal', '');
  });

  it('should not fail when deleting multiple times', () => {
    create()
      .its('body.id')
      .then((id) => deleteFavorites(id))
      .then(() => deleteFavorites(DUMMY_MONGODB_ID))
      .its('status')
      .should('equal', 204);
  });
});
