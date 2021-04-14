describe('task-list-component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=tasklist--with-pinned-tasks'));

  it('should render the component', () => {
    cy.get('drp-task-list').should('exist');
  });

  it('should render pinned tasks at the top of the list', () => {
    // cy.get('drp-task-list')
    // get the list of tasks
    // the top task should have text content of 'Text 6 (pinned)'
  });
});
