describe('/stories/classic-cars-1952-pontiac/classic-cars-1952-pontiac-1', () => {
  beforeEach(() => {
    cy.visit('/stories/classic-cars-1952-pontiac/classic-cars-1952-pontiac-1');
  });

  it('contains a header with event image works', () => {
    cy.contains('p', 'event-image works!');
  });
});
