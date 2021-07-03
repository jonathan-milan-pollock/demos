import {
  About,
  Destination,
  DestinationUpdate,
  DUMMY_MONGODB_ID,
  mockDestinationUpdate,
} from '@dark-rush-photography/shared/types';

/*
describe('Admin Image Dimensions API', () => {
  const authorization = '';

  const createAbout = (slug: string) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/about/${slug}`,
      headers: {
        Authorization: authorization,
      },
    });

  const findAllAbout = () =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/about',
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

  const add = (
    entityId: string,
    imageId: string,
    imageDimensionAdd: ImageDimensionAdd
  ) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/image-dimensions?entityId=${entityId}&imageId=${imageId}`,
      headers: {
        Authorization: authorization,
      },
      body: { ...imageDimensionAdd },
    });

  const update = (
    id: string,
    entityId: string,
    imageDimensionUpdate: ImageDimensionUpdate
  ) =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/image-dimensions/${id}?entityId=${entityId}`,
      headers: {
        Authorization: authorization,
      },
      body: { ...imageDimensionUpdate },
      failOnStatusCode: false,
    });

  const findOne = (id: string, entityId: string) =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/image-dimensions/${id}?entityId=${entityId}`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  const data = (id: string) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/image-dimensions/${id}/data`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  beforeEach(() => {
    findAllAbout().then(($body) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $body.body.forEach((about: About) => deleteAbout(about.id!));
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
});
*/
