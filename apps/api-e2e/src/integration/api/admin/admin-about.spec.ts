import { About, DUMMY_MONGODB_ID } from '@dark-rush-photography/shared-types';

describe('Admin About API', () => {
  const authorization = '';

  const create = (slug: string) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/about/${slug}`,
      headers: {
        Authorization: authorization,
      },
    });

  const findAll = () =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/about',
      headers: {
        Authorization: authorization,
      },
    });

  const findOne = (id: string) =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  const deleteAbout = (id: string) => {
    return cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/about/${id}`,
      headers: {
        Authorization: authorization,
      },
    });
  };

  beforeEach(() => {
    findAll().then(($body) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $body.body.forEach((about: About) => deleteAbout(about.id!));
    });
  });

  it('should return application/json', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create about', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });

  it('should return existing about when created with same slug', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .then(() => create(`test-about-${randomNumber}`))
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });

  it('should only create one about for the same slug', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .then(() => create(`test-about-${randomNumber}`))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 1);
  });

  it('should find all created about', () => {
    create('test-about-1')
      .then(() => create('test-about-2'))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 2);
  });

  it('should find one about', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.id')
      .then((id) => findOne(id))
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });

  it('should not find an about that does not exist', () => {
    findOne(DUMMY_MONGODB_ID).its('status').should('equal', 404);
  });

  it('should delete a created about', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteAbout(id))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 0);
  });

  it('should return a status of 204 when delete', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteAbout(id))
      .its('status')
      .should('equal', 204);
  });

  it('should return an empty body when delete', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteAbout(id))
      .its('body')
      .should('equal', '');
  });

  it('should not fail when deleting multiple times', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteAbout(id))
      .then(() => deleteAbout(DUMMY_MONGODB_ID))
      .its('status')
      .should('equal', 204);
  });
});
