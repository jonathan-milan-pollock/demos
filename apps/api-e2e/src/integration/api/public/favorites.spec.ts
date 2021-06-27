import { About } from '@dark-rush-photography/shared-types';

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

  it('returns JSON', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('creates about', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-about-${randomNumber}`)
      .its('body.slug')
      .should('equal', `test-about-${randomNumber}`);
  });

  it('find all should return the count of about', () => {
    create('test-about-1').then(() => {
      findAll().its('body.length').should('equal', 1);
    });
  });

  it('finds one returns created about', () => {
    create('test-about-1')
      .its('body.id')
      .then((id) => {
        findOne(id).its('body.slug').should('equal', 'test-about-1');
      });
  });

  it('delete should remove a created about', () => {
    create('test-about-1')
      .its('body.id')
      .then((id) => deleteAbout(id))
      .then(() => findAll().its('body.length').should('equal', 0));
  });
});
