describe('Test Login', () => {
    it('launches', () => {
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
  
      cy.contains("Join a Team")
        .should("have.text", " 🤝🏿 Join a Team ");
  
      cy.contains("Logout").click({ force: true });
  
      cy.contains("Log in").click();
      cy.get('input[placeholder="eg. john@email.com"]')
        .should("have.value", "");
  
      cy.get('input[type="password"]')
        .first()
        .should("have.value", "");
    });
  });
  