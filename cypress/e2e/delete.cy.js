describe("DELETE /characters/id", () => {
    const tochaHumana = {
      name: "Johny Storm",
      alias: "Tocha Humana",
      team: ["Quarteto Fantástico"],
      active: true,
    };
  
    before(() => {
      cy.back2ThePast();
      cy.setToken();
    });
  
    context("Quando tenho um personagem cadastrado", () => {
      before(() => {
        cy.postCharacter(tochaHumana).then((response) => {
          Cypress.env("characterId", response.body.character_id);
        });
      });
  
      it("Deve buscar remover o personagem pelo id", () => {
        const id = Cypress.env("characterId");
        cy.deleteCharactersById(id).then((response) => {
          expect(response.status).to.eql(204);
        });
      });

      after(() => {
        const id = Cypress.env('characterId')
        cy.getCharactersById(id).then((response) => {
          expect(response.status).to.eql(404)
        })
      });
  
      it("Deve retornar 404 ao removerpor id não cadatrado", () => {
        const id = "63406e05fdb9efcc5306ee40";
        cy.deleteCharactersById(id).then((response) => {
          expect(response.status).to.eql(404);
        });
      });
    });
  });
  