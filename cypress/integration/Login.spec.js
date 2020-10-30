Cypress.Commands.add('cleanUpXHR', function() {
  cy.visit('/404', { failOnStatusCode: false });
});

describe ('Test Login', () => {

    beforeEach('clear cache before the test',function(){
    cy.clearLocalStorage()
    cy.clearCookies()
    //cy.reload(true);
    }) 

    afterEach(() => {
      cy.cleanUpXHR();
    });

    it ('launches', () => {
      // Navigate to the login page
      cy.visit ('/');
      cy.contains("Login").click();

      // Fill login form
      // UID is P7ZXY8P5mHWGqR7yaVFx9C2VaMy2
      var email = "mytest@email.com"
      var password = "mytestpassword"
      cy.get('input[placeholder="eg. JohnDoe@email.co,"]')
      .type(email)
      .should("have.value", email);

      cy.get('input[type="password"]')
      .first()
      .type(password)
      .should("have.value", password);

      // Click login button
      cy.contains("Login").click({force: true});

      cy.contains("Join New Team")
      .should("have.text", "Join New Team");

      cy.contains("Logout").click({force: true});

      cy.contains("Login").click();
      cy.get('input[placeholder="eg. JohnDoe@email.co,"]')
      .should("have.value", "");

      cy.get('input[type="password"]')
      .first()
      .should("have.value", "");
    });
  });