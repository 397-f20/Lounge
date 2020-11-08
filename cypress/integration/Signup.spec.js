function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
Cypress.Commands.add('cleanUpXHR', function () {
  cy.visit('/404', { failOnStatusCode: false });
});
describe('Test Signup', () => {
  beforeEach('clear cache before the test', function () {
    cy.clearLocalStorage()
    cy.clearCookies()
    //cy.reload(true);
  })
  afterEach(() => {
    cy.cleanUpXHR();
  });
  it('launches', () => {
    // Navigate to the Sign Up page
    cy.visit('/');
    cy.contains("Sign up").click();
    // Test Sign Up
    var email_test = makeid(3) + '@' + makeid(3) + ".com";
    cy.get('input[placeholder="eg. john@email.com"]').focus().should('be.enabled')
      .type(email_test)
      .should("have.value", email_test);
    cy.get('input[placeholder="eg. John"]')
      .type("Han")
      .should("have.value", "Han");
    cy.get('input[placeholder="eg. Doe"]')
      .type("Cao")
      .should("have.value", "Cao");
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
    cy.contains("Sign up").click({ force: true });
  });
}); 
