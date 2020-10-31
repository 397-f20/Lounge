// describe('Test Login', () => {
//   it('launches', () => {
//     // Navigate to the login page
//     cy.visit('/');
//     cy.contains("Login").click();

//     // Fill login form
//     // UID is P7ZXY8P5mHWGqR7yaVFx9C2VaMy2
//     var email = "mytest@email.com"
//     var password = "mytestpassword"
//     cy.get('input[placeholder="eg. JohnDoe@email.co,"]')
//       .type(email)
//       .should("have.value", email);

//     cy.get('input[type="password"]')
//       .first()
//       .type(password)
//       .should("have.value", password);
  
// });
// });


//------------ SOMEONE CHECK THIS ^^ ------------------------------


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
      // Navigate to the Sign Up page
      cy.visit ('/');
      cy.contains("Sign Up").click();

    cy.contains("Join New Team")
      .should("have.text", "Join New Team");

    cy.contains("Logout").click({ force: true });

    cy.contains("Login").click();
    cy.get('input[placeholder="eg. JohnDoe@email.co,"]')
      .should("have.value", "");

    cy.get('input[type="password"]')
      .first()
      .type("123456")
      .should("have.value", "123456");

      cy.get('input[type="password"]')
      .last()
      .type("123456")
      .should("have.value", "123456");

      // Finalize sign up
      // It only works the first time you sign up.
      cy.contains("Sign Up").click({force: true});




    }); 
  });
