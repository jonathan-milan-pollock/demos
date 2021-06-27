import { BestOfType } from '@dark-rush-photography/shared-types';

describe('Admin Best Of API', () => {
  const authorization = '';

  const create = (bestOfType: BestOfType) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/best-of/${bestOfType}`,
      headers: {
        Authorization: authorization,
      },
    });

  const findOne = (bestOfType: BestOfType) =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/best-of/${bestOfType}`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  const deleteBestOf = (bestOfType: BestOfType) => {
    return cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/best-of/${bestOfType}`,
      headers: {
        Authorization: authorization,
      },
    });
  };

  beforeEach(() => {
    Object.keys(BestOfType).forEach((key) => deleteBestOf(key as BestOfType));
  });

  it('should return application/json', () => {
    create(BestOfType.Children)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create children', () => {
    create(BestOfType.Children)
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it('should return existing best of when created with same type', () => {
    create(BestOfType.Children)
      .then(() => create(BestOfType.Children))
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it('should find one best of', () => {
    create(BestOfType.Children)
      .then(() => findOne(BestOfType.Children))
      .its('body.slug')
      .should('equal', BestOfType.Children);
  });

  it('should delete a created best of', () => {
    create(BestOfType.Children)
      .then(() => deleteBestOf(BestOfType.Children))
      .then(() => findOne(BestOfType.Children))
      .its('status')
      .should('equal', 404);
  });

  it('should return a status of 204 when delete', () => {
    create(BestOfType.Children)
      .then(() => deleteBestOf(BestOfType.Children))
      .its('status')
      .should('equal', 204);
  });

  it('should return an empty body when delete', () => {
    create(BestOfType.Children)
      .then(() => deleteBestOf(BestOfType.Children))
      .its('body')
      .should('equal', '');
  });

  it('should not fail when deleting multiple times', () => {
    create(BestOfType.Children)
      .then(() => deleteBestOf(BestOfType.Children))
      .then(() => deleteBestOf(BestOfType.Children))
      .its('status')
      .should('equal', 204);
  });
});
