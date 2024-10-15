describe('Sign up page', () => {
  it('sign up', () => {
    cy.visit('/sign-up');
    cy.get('input[name="username"]').type('newuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assuming successful sign-up redirects to login
    cy.url().should('include', '/login');
    cy.contains('Profile created!').should('be.visible');
  })
})