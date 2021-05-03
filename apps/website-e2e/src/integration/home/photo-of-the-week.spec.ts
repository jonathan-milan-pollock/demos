describe('/photo-of-the-week', () => {
  beforeEach(() => {
    cy.visit('/photo-of-the-week');
  });

  it('contains a header with photo-of-the-week works', () => {
    cy.contains('p', 'photo-of-the-week works!');
  });

  it('links to /photo-of-the-week/aint-no-mountain-high-enough', () => {
    cy.contains(`Ain't No Mountain High Enough`).should(
      'have.attr',
      'href',
      '/photo-of-the-week/aint-no-mountain-high-enough'
    );
  });
});
