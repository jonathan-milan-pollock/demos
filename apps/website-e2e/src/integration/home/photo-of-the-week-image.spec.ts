describe('/photo-of-the-week/aint-no-mountain-high-enough', () => {
  beforeEach(() => {
    cy.visit('/photo-of-the-week/aint-no-mountain-high-enough');
  });

  it('contains a header with photo-of-the-week-image works', () => {
    cy.contains('p', 'photo-of-the-week-image works!');
  });
});
