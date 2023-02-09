describe('Navigation', () => {
    it("Loads home page successfully", () => {
        cy.visit("/");
    });

    it("Loads about page successfully", () => {
        cy.visit("About");
    });

    it('Should navigate to the about page', () => {
        // Start from index page
        cy.visit("/");

        // Find a button with text "about"
        cy.get("a").contains("About").click();

        // See if URL contains /about
        cy.url().should("include", "/about");
    });

    it('Should navigate to the home page', () => {
        // Start from about page
        cy.visit('/about');

        cy.get("a").contains("Home").click();

        // See if URL is at index page
        cy.url().should('eq', Cypress.config().baseUrl);
    });
});