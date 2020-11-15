describe('Test Teams', () => {
    var teamid = "-MLA6lYmXm9LL_bqIcJa";
    var teamName = "Red Squad";
    it('Renders Teams Page', () => {
        // Navigate to the login page
        cy.visit('/');
        
        cy.contains("Log in").click({ force: true });

        // Login
        var email = "dwivedisankalp97@gmail.com"
        var password = "sankalp"

        cy.get('input[placeholder="eg. john@email.com"]').type(email)
        cy.get('input[placeholder="eg. john@email.com"]').should("have.value", email);

        cy.get('input[type="password"]').first().type(password)
        cy.get('input[type="password"]').first().should("have.value", password);

        // Click login button
        cy.contains("Log in").click({ force: true });

        // Check for team
        cy.contains(teamName).should('be.visible');

        // // Click on team name to enter team
        cy.contains(teamName).click({ force: true });

        // // Click Go Online to enter lobby
        cy.contains("Go Online").click({ force: true });

        // Vote to close
        cy.contains("Vote").click({ force: true });

        // // Check if joined lobby
        cy.contains("Sankalp ✅").should('be.visible');

        // // Go back to exit lobby
        cy.contains("Back").click({ force: true });

        // // Enter team again
        cy.contains(teamName).click({ force: true });

        // // Check if still in lobby
        cy.contains("Sankalp ✅").should('not.exist');

        cy.contains("Back").click({ force: true });


        // Navigate to the login page
        cy.contains("Logout").click({ force: true });
    });

    // Check team display
    // it('New Team display', () => {
    //     cy.visit ('/');
    //     cy.contains(teamid).click({ force: true });
    // });
});