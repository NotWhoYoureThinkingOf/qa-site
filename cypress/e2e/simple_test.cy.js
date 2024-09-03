context('Simple Test', () => {
    it('Visits the Cypress website', () => {
      cy.visit('https://example.cypress.io')
      cy.contains('type').click()
  
      // Should be on a new URL which includes '/commands/actions'
      cy.url().should('include', '/commands/actions')
    })
  })