describe('about API', () => {
    const initialItems = [
        {
          "id": 1,
          "task": "read something"
        },
        {
          "id": 2,
          "task": "write something"
        }
      ]
      
    it('returns JSON', () => {
      cy.request('http://localhost:1111/api/admin/v1/about')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')
    })

    it('loads 2 items', () => {
        cy.request('http://localhost:1111/api/admin/v1/about')
          .its('body')
          .should('have.length', 2)
      })
    });