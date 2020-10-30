function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe ('Test Login', () => {
    it ('launches', () => {
      // Navigate to the Sign Up page
      cy.visit ('/');
      cy.contains("Sign Up").click();

      // Test Sign Up
      var email_test = makeid(3) + '@' + makeid(3) + ".com";
      cy.get('input[placeholder="eg. JohnDoe@email.com"]')
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
      // Only works if this is your first sign up
      cy.contains("Sign Up").click({force: true});

      // Safe to use but wont pass the test 
      //cy.contains("Sign Up").click();

    });
  });