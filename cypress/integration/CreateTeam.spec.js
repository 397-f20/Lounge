describe('Test CreateTeam', () => {
    var teamName = "My new team name";
    it('Join New Team', () => {
        // Navigate to the login page
        cy.visit('/');
        cy.contains("Log in").click();
        // Fill login form
        // UID is P7ZXY8P5mHWGqR7yaVFx9C2VaMy2
        var email = "mytest@email.com"
        var password = "mytestpassword"
        cy.get('input[placeholder="eg. john@email.com"]')
        .type(email)
        .should("have.value", email);
        cy.get('input[type="password"]')
        .first()
        .type(password)
        .should("have.value", password);
        // Click login button
        cy.contains("Log in").click({ force: true });

        // Navigate to the joinTeam page
        // Click join new team
        cy.contains(" 🌱 Create Team ").click({ force: true });
        cy.get('input[placeholder="eg. Third floor squad"]')
        .type(teamName)
        .should("have.value", teamName);
        cy.contains("Create Team").click();

        cy.contains(teamName).should('be.visible');
        // Navigate to the login page
        cy.contains("Logout").click({ force: true });
    });

    // Check team display
    // it('New Team display', () => {
    //     cy.visit ('/');
    //     cy.contains(teamid).click({ force: true });
    // });
});
  