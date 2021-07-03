import {
  Destination,
  DestinationUpdate,
  DUMMY_MONGODB_ID,
  mockDestinationUpdate,
} from '@dark-rush-photography/shared/types';

describe('Admin Destinations API', () => {
  const authorization = '';

  const create = (slug: string) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/destinations/${slug}`,
      headers: {
        Authorization: authorization,
      },
    });

  const update = (id: string, destinationUpdate: DestinationUpdate) =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/destinations/${id}`,
      headers: {
        Authorization: authorization,
      },
      body: { ...destinationUpdate },
      failOnStatusCode: false,
    });

  const findAll = () =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/destinations',
      headers: {
        Authorization: authorization,
      },
    });

  const findOne = (id: string) =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/destinations/${id}`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  const post = (id: string) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/destinations/${id}/post`,
      headers: {
        Authorization: authorization,
      },
    });

  const deleteDestination = (id: string) => {
    return cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/destinations/${id}`,
      headers: {
        Authorization: authorization,
      },
    });
  };

  beforeEach(() => {
    findAll().then(($body) => {
      $body.body.forEach((destination: Destination) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        deleteDestination(destination.id!)
      );
    });
  });

  it('should return application/json', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create destination', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('body.slug')
      .should('equal', `test-destination-${randomNumber}`);
  });

  it('should return existing destination when created with same slug', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .then(() => create(`test-destination-${randomNumber}`))
      .its('body.slug')
      .should('equal', `test-destination-${randomNumber}`);
  });

  it('should only create one destination for the same slug', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .then(() => create(`test-destination-${randomNumber}`))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 1);
  });

  it('should update a destination', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const mockDestination = mockDestinationUpdate();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => {
        return update(id, mockDestination)
          .its('body')
          .should('deep.equal', {
            ...mockDestination,
            id,
            images: [],
            imageDimensions: [],
            videos: [],
            videoDimensions: [],
            comments: [],
            emotions: [],
          });
      });
  });

  it('should update an updated destination', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const mockDestination1 = mockDestinationUpdate();
    const mockDestination2 = mockDestinationUpdate();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => {
        return update(id, mockDestination1).then(() =>
          update(id, mockDestination2)
            .its('body')
            .should('deep.equal', {
              ...mockDestination2,
              id,
              images: [],
              imageDimensions: [],
              videos: [],
              videoDimensions: [],
              comments: [],
              emotions: [],
            })
        );
      });
  });

  it('should not update a destination that does not exist', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const mockDestination = mockDestinationUpdate();
    create(`test-destination-${randomNumber}`)
      .then(() => update(DUMMY_MONGODB_ID, mockDestination))
      .its('status')
      .should('equal', 404);
  });

  it('should find all created destinations', () => {
    create('test-destination-1')
      .then(() => create('test-destination-2'))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 2);
  });

  it('should find one destination', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => findOne(id))
      .its('body.slug')
      .should('equal', `test-destination-${randomNumber}`);
  });

  it('should not find a destination that does not exist', () => {
    findOne(DUMMY_MONGODB_ID).its('status').should('equal', 404);
  });

  it('should delete a created destination', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteDestination(id))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 0);
  });

  it('should return a status of 204 when delete', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteDestination(id))
      .its('status')
      .should('equal', 204);
  });

  it('should return an empty body when delete', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteDestination(id))
      .its('body')
      .should('equal', '');
  });

  it('should not fail when deleting multiple times', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    create(`test-destination-${randomNumber}`)
      .its('body.id')
      .then((id) => deleteDestination(id))
      .then(() => deleteDestination(DUMMY_MONGODB_ID))
      .its('status')
      .should('equal', 204);
  });
});
