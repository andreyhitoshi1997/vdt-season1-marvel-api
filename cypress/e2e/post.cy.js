describe("POST /characters", () => {
  before(() => {
    cy.back2ThePast()
    cy.setToken()
  });

  it("deve cadastrar um personagem", () => {
    const character = {
      name: "Professor Xavier",
      alias: "Professor X",
      team: ["X-men", "illuminatis"],
      active: true,
    };

    cy.request({
      method: "POST",
      url: "/characters",
      body: character,
      headers: {
        Authorization: Cypress.env("token"),
      },
    }).then((response) => {
      expect(response.status).to.eql(201);
    });
  });
});
