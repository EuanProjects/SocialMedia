describe('Login page', () => {
    it('login', () => {
        cy.visit('/login');
        cy.get('input[name="username"]').type('newuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/profile');
    })
})