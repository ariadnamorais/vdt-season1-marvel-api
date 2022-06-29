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


//comandos customizados
//pegar token
Cypress.Commands.add('setToken', function () {
    cy.api({
        method: 'POST',
        url: '/sessions',
        body: {
            email: 'ariadnamoraishp1@gmail.com',
            password: '123124'
        },
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
        // cy.log(response.body.token)
        Cypress.env('token', response.body.token)
    })
})

Cypress.Commands.add('back2ThePast', function () {
    //fazer requisicao para deletar o user criado
    cy.api({
        method: 'DELETE',
        url: '/back2thepast/629843f16791aa00161c9cf0',
        failOnStatusCode: false
    }).then(function (response) {
        expect(response.status).to.eql(200)
    })
})

// POST requisicao que testa o cadastro de personagens
Cypress.Commands.add('postCharacter', function (payLoad) {
    cy.api({
        method: 'POST',
        url: '/characters',
        body: payLoad,
        headers: {
            Authorization: Cypress.env('token') //o valor da variavel foi definida atrazes do setToken
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

// GET requisicao que testa o cadastro de personagens
Cypress.Commands.add('getCharacter', function () {
    cy.api({
        method: 'GET',
        url: '/characters',
        headers: {
            Authorization: Cypress.env('token') //o valor da variavel foi definida atrazes do setToken
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('searchCharacter', function (characterName) {
    cy.api({
        method: 'GET',
        url: '/characters',
        qs:{name: characterName},
        headers: {
            Authorization: Cypress.env('token') //o valor da variavel foi definida atrazes do setToken
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('getCharacterById', function (characterId) {
    cy.api({
        method: 'GET',
        url: '/characters/'+ characterId,
        headers: {
            Authorization: Cypress.env('token') //o valor da variavel foi definida atrazes do setToken
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('deleteCharacterById', function (characterId) {
    cy.api({
        method: 'DELETE',
        url: '/characters/'+ characterId,
        headers: {
            Authorization: Cypress.env('token') //o valor da variavel foi definida atrazes do setToken
        },
        failOnStatusCode: false
    }).then(function (response) {
        return response
    })
})

Cypress.Commands.add('populateCharacters', function (characters) {
    characters.forEach(function (c) {
        cy.postCharacter(c)
    })
})
