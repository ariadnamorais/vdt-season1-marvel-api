describe('POST /characters', function () {

    before(function () {
        //commands customizados
        cy.back2ThePast()
        cy.setToken()
    })

    it('Deve cadastrar um personagem', function () {

        const characters = {  //massa de dados em uma constante
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(characters)
            .then(function (response) {
                expect(response.status).to.eql(201) //espera que o retorno seja 201 (sucesso)
                // cy.log(response.body)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)//valida se o id tem 24 caracteres
            })
    })

    context('quando o personagem já existe', function () {

        const characters = {  //massa de dados em uma constante
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'vingadores da costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(function () {

            cy.postCharacter(characters)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })

        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacter(characters)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })
})