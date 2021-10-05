import { getAuthHeaders } from '../../../../support/commands/api/auth-headers.functions';

describe('Public Find All Public Entities', () => {
  beforeEach(() => cy.login().then(() => cy.deleteTestData(getAuthHeaders())));

  /*  const authorization = '';
  const findAll = () =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/about',
      headers: {
        Authorization: authorization,
      },
    });

  const findOne = (entityId: string) =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/about/${entityId}`,
      headers: {
        Authorization: authorization,
      },
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
  });*/
});
