// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setToken', () => {
    cy.request({
      method: "POST",
      url: "/sessions",
      body: {
        email: "andrey@qacademy.io",
        password: "qa-cademy",
      },
    }).then((response) => {
      expect(response.status).to.eql(200);
      cy.log(response.body.token);
      Cypress.env("token", response.body.token);
    });
  })
  
  Cypress.Commands.add('back2ThePast', () => {
    cy.request({
      method: "DELETE",
      url: "/back2thepast/633b15676c35b200161dc5a4",
    }).then((response) => {
      expect(response.status).to.eql(200);
    });
  })
  