context('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/frontend/src/index.html')
    })

    it ('has an h1 on the page', () => {
        cy.get('h1').should('exist')
    })

    it ('has the correct h1 text', () => {
        cy.get('h1').should('contain.text', 'Clothing Store');
    })

    it ('renders the products in clothing items section', () => {
        cy.get('.clothing-items').within(() => {
            cy.get('div').each(($el, index, $list) => {
                cy.wrap($el).should('be.visible')
                cy.wrap($el).should('have.class', 'clothing-item')
            })
        })
    })

    it ('renders each clothing item with the expected elements', () =>{
        cy.get('.clothing-item').each(($el) => {
            cy.wrap($el).find('img').should('be.visible')
            cy.wrap($el).find('h4').should('be.visible')
            cy.wrap($el).find('p').should('be.visible')
        })
    })

    it ('display text saying the cart is empty', () => {
        cy.get('.empty-cart-btn').click()
        cy.findByText('Your cart is empty').should('exist')
    })

    it ('adds an item to the cart', () => {
        cy.get('.clothing-item').first().click()
        cy.get('.cart-item').should('be.visible')
    })

    it ('removes items from the cart', () => {
        cy.get('.clothing-item').first().click()
        cy.get('.cart-item').should('be.visible')
        cy.get('.removeBtn').should('exist').click()
        cy.get('.cart-items').contains('Your cart is empty')
    })

    it ('gets response from database', function() {
        cy.request('http://localhost:3000/api/products').its('status').should('eq', 200)
    })

    it ('gets a body in the response', () => {
        cy.request('http://localhost:3000/api/products').its('body').then((body) => {
            cy.log("Response:", body)
        })
    })

    it ('gets all the clothing products', () => {
        cy.request('http://localhost:3000/api/products').its('body').then((body) => {
            expect(body.length).to.have.greaterThan(0);
            expect(body.length).eq(5);
        })
    })
})