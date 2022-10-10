describe("GET /character", () => {
  const characters = [
    {
      name: "Charles Xavier",
      alias: "Professor X",
      team: ["X-men"],
      active: true,
    },
    {
      name: "Logan",
      alias: "Wolverine",
      team: ["X-men"],
      active: true,
    },
    {
      name: "Peter Parker",
      alias: "Homem Aranha",
      team: ["Novos Vingadores"],
      active: true,
    },
  ];

  before(() => {
    cy.back2ThePast();
    cy.setToken();
    cy.populateCharacters(characters);
  });

  it("Deve retornar uma lista de personagens", () => {
    cy.getCharacters().then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body).to.be.a("array");
      expect(response.body.length).greaterThan(0);
    });
  });

  it("Deve buscar personagem por nome", () => {
    cy.searchCharacters("Logan").then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body.length).to.eql(1);
      expect(response.body[0].alias).to.eql("Wolverine");
      expect(response.body[0].team).to.eql(["X-men"]);
      expect(response.body[0].active).to.eql(true);
    });
  });
});

describe("GET /character/id", () => {
  const tonyStark = {
    name: "Tony Stark",
    alias: "Homem de Ferro",
    team: ["Vingadores"],
    active: true,
  };

  before(() => {
    cy.back2ThePast();
    cy.setToken();
  });

  context("Quando tenho um personagem cadastrado", () => {
    before(() => {
      cy.postCharacter(tonyStark).then((response) => {
        Cypress.env("characterId", response.body.character_id);
      });
    });

    it("Deve buscar o personagem pelo id", () => {
      const id = Cypress.env("characterId");
      cy.getCharactersById(id).then((response) => {
        expect(response.status).to.eql(200);
        expect(response.body.alias).to.eql("Homem de Ferro");
        expect(response.body.team).to.eql(["Vingadores"]);
        expect(response.body.active).to.eql(true);
      });
    });

    it("Deve retornar 404", () => {
      const id = "63406e05fdb9efcc5306ee40";
      cy.getCharactersById(id).then((response) => {
        expect(response.status).to.eql(404);
      });
    });
  });
});
