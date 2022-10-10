describe('POST /characters', () => {
  before(() => {
    cy.back2ThePast();
    cy.setToken();
  });

  it('deve cadastrar um personagem', () => {
    const character = {
      name: 'Professor Xavier',
      alias: 'Professor X',
      team: ['X-men', 'illuminatis'],
      active: true,
    };

    cy.postCharacter(character)
      .then((response) => {
        expect(response.status).to.eql(201);
        cy.log(response.body.character_id)
        expect(response.body.character_id.length).to.eql(24);
      })
  });

  context('quando o personagem ja existe', () => {
    const character = {
      name: 'Pietro Maximoff',
      alias: 'Professor X',
      team: ['Vingadores Costa Oeste', 'Irmandade dos mutantes'],
      active: true,
    };

    before(() => {
      cy.postCharacter(character)
      .then((response) => {
        expect(response.status).to.eql(201);
      });
    });

    it('não deve cadastrar duplicado', () => {
      cy.postCharacter(character)
      .then((response) => {
        expect(response.status).to.eql(400);
        expect(response.body.error).to.eql('Duplicate character');
      });
    });
  });
});

