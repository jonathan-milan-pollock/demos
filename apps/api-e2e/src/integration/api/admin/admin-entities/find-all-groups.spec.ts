const ABOUT = 'About';
const EVENT = 'Event';
const PHOTO_OF_THE_WEEK = 'PhotoOfTheWeek';
const SHARED_PHOTO_ALBUM = 'SharedPhotoAlbum';
const SOCIAL_MEDIA = 'SocialMedia';

describe('findAllGroups', () => {
  beforeEach(() => cy.loginAdmin());

  it('return application/json', () => {
    cy.findAllGroupsEntityAdmin(EVENT)
      .then((response) => response)
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
  });

  it('find groups for events', () => {
    cy.findAllGroupsEntityAdmin(EVENT)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find groups for photo of the week', () => {
    cy.findAllGroupsEntityAdmin(PHOTO_OF_THE_WEEK)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find groups for shared photo albums', () => {
    cy.findAllGroupsEntityAdmin(SHARED_PHOTO_ALBUM)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('find groups for social media', () => {
    cy.findAllGroupsEntityAdmin(SOCIAL_MEDIA)
      .then((response) => response)
      .its('body.length')
      .should('be.greaterThan', 0);
  });

  it('return unique groups for shared photo albums', () => {
    cy.findAllGroupsEntityAdmin(SHARED_PHOTO_ALBUM)
      .then((response) => response)
      .its('body')
      .then((body) => {
        const duplicates = body.filter(
          (group, index, groups) => groups.indexOf(group) !== index
        );
        if (duplicates.length > 0) console.error(duplicates);
        return duplicates.length;
      })
      .should('equal', 0);
  });

  it('return a status of 200 when returning groups', () => {
    cy.findAllGroupsEntityAdmin(EVENT)
      .then((response) => response)
      .its('status')
      .should('equal', 200);
  });

  it('return a bad request status when called for entity without groups', () => {
    cy.findAllGroupsEntityAdmin(ABOUT)
      .then((response) => response)
      .its('status')
      .should('equal', 400);
  });

  it('return a bad request message when called for entity without groups', () => {
    cy.findAllGroupsEntityAdmin(ABOUT)
      .then((response) => response)
      .its('body.message')
      .should('equal', `Entity ${ABOUT} does not have groups`);
  });
});
