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

Cypress.Commands.add("setToken", () => {
  cy.api({
    method: "POST",
    url: "/sessions",
    body: {
      email: "andrey@qacademy.io",
      password: "qa-cademy",
    },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eql(200);
    Cypress.env("token", response.body.token);
  });
});

Cypress.Commands.add("back2ThePast", () => {
  cy.api({
    method: "DELETE",
    url: "/back2thepast/633b15676c35b200161dc5a4",
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eql(200);
  });
});

//POST requisição que testa o cadastro de personagem
Cypress.Commands.add("postCharacter", (payload) => {
  cy.api({
    method: "POST",
    url: "/characters",
    body: payload,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

//GET requisição que testa a obtenção de personagens
Cypress.Commands.add("getCharacters", () => {
  cy.api({
    method: "GET",
    url: "/characters",
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("searchCharacters", (characterName) => {
  cy.api({
    method: "GET",
    url: "/characters",
    qs: {name: characterName},
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("deleteCharactersById", (characterId) => {
  cy.api({
    method: "DELETE",
    url: "/characters/" + characterId,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("getCharactersById", (characterId) => {
  cy.api({
    method: "GET",
    url: "/characters/" + characterId,
    headers: {
      Authorization: Cypress.env("token"),
    },
    failOnStatusCode: false,
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("populateCharacters", (characters) => {
  characters.forEach((c) => {
    cy.postCharacter(c);
  });
});
