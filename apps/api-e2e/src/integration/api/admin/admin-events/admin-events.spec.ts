import {
  DUMMY_MONGODB_ID,
  EventCreate,
  EventUpdate,
  Event,
  mockEventCreate,
  mockEventUpdate,
} from '@dark-rush-photography/shared/types';

describe('Admin Events API', () => {
  const authorization = '';

  const create = (eventCreate: EventCreate) =>
    cy.request({
      method: 'POST',
      url: '/api/admin/v1/events',
      headers: {
        Authorization: authorization,
      },
      body: { ...eventCreate },
    });

  const update = (id: string, eventUpdate: EventUpdate) =>
    cy.request({
      method: 'PUT',
      url: `/api/admin/v1/events/${id}`,
      headers: {
        Authorization: authorization,
      },
      body: { ...eventUpdate },
      failOnStatusCode: false,
    });

  const findAll = () =>
    cy.request({
      method: 'GET',
      url: '/api/admin/v1/events',
      headers: {
        Authorization: authorization,
      },
    });

  const findOne = (id: string) =>
    cy.request({
      method: 'GET',
      url: `/api/admin/v1/events/${id}`,
      headers: {
        Authorization: authorization,
      },
      failOnStatusCode: false,
    });

  const post = (id: string) =>
    cy.request({
      method: 'POST',
      url: `/api/admin/v1/events/${id}/post`,
      headers: {
        Authorization: authorization,
      },
    });

  const deleteEvent = (id: string) => {
    return cy.request({
      method: 'DELETE',
      url: `/api/admin/v1/events/${id}`,
      headers: {
        Authorization: authorization,
      },
    });
  };

  beforeEach(() => {
    findAll().then(($body) => {
      $body.body.forEach((event: Event) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        deleteEvent(event.id!)
      );
    });
  });

  it('should return application/json', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };

    create(eventCreate)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('should create event', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };

    create(eventCreate)
      .its('body.slug')
      .should('equal', `test-event-${randomNumber}`);
  });

  it('should return existing event when created with same group and slug', () => {
    const groupNumber = Cypress._.random(0, 100).toString();
    const slugNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      group: groupNumber,
      slug: `test-event-${slugNumber}`,
    };
    create(eventCreate)
      .then(() => create(eventCreate))
      .its('body.slug')
      .should('equal', eventCreate.slug);
  });

  it('should only create one event for the same group and slug', () => {
    const groupNumber = Cypress._.random(0, 100).toString();
    const slugNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      group: groupNumber,
      slug: `test-event-${slugNumber}`,
    };
    create(eventCreate)
      .then(() => create(eventCreate))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 1);
  });

  it('should update an event', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    const mock = mockEventUpdate();
    create(eventCreate)
      .its('body.id')
      .then((id) => {
        return update(id, mock)
          .its('body')
          .should('deep.equal', {
            ...mock,
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

  it('should update an updated event', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    const mock1 = mockEventUpdate();
    const mock2 = mockEventUpdate();
    create(eventCreate)
      .its('body.id')
      .then((id) => {
        return update(id, mock1).then(() =>
          update(id, mock2)
            .its('body')
            .should('deep.equal', {
              ...mock2,
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

  it('should not update an event that does not exist', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    const mockEvent = mockEventUpdate();
    create(eventCreate)
      .then(() => update(DUMMY_MONGODB_ID, mockEvent))
      .its('status')
      .should('equal', 404);
  });

  it('should find all created events', () => {
    const eventCreate1 = { ...mockEventCreate(), slug: `test-event-1` };
    const eventCreate2 = { ...mockEventCreate(), slug: `test-event-2` };
    create(eventCreate1)
      .then(() => create(eventCreate2))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 2);
  });

  it('should find one event', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    create(eventCreate)
      .its('body.id')
      .then((id) => findOne(id))
      .its('body.slug')
      .should('equal', `test-event-${randomNumber}`);
  });

  it('should not find an event that does not exist', () => {
    findOne(DUMMY_MONGODB_ID).its('status').should('equal', 404);
  });

  it('should delete a created event', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    create(eventCreate)
      .its('body.id')
      .then((id) => deleteEvent(id))
      .then(() => findAll())
      .its('body.length')
      .should('equal', 0);
  });

  it('should return a status of 204 when delete', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    create(eventCreate)
      .its('body.id')
      .then((id) => deleteEvent(id))
      .its('status')
      .should('equal', 204);
  });

  it('should return an empty body when delete', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    create(eventCreate)
      .its('body.id')
      .then((id) => deleteEvent(id))
      .its('body')
      .should('equal', '');
  });

  it('should not fail when deleting multiple times', () => {
    const randomNumber = Cypress._.random(0, 100).toString();
    const eventCreate = {
      ...mockEventCreate(),
      slug: `test-event-${randomNumber}`,
    };
    create(eventCreate)
      .its('body.id')
      .then((id) => deleteEvent(id))
      .then(() => deleteEvent(DUMMY_MONGODB_ID))
      .its('status')
      .should('equal', 204);
  });
});
