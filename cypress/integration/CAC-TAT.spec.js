/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = "teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste"

        cy.get('#firstName').type('Rangel Luiz')
        cy.get('#lastName').type('Bombonatto')
        cy.get('#email').type('rangel@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button','Enviar').click()

        cy.get('.success').should('to.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Rangel Luiz')
        cy.get('#lastName').type('Bombonatto')
        cy.get('#email').type('rangel@exemplo,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('to.be.visible')        
    })

    it('campo telefone continua vazio ao preencher com valor numerico', () => {
        cy.get('#phone')
            .type('ujdhuishduahduia')
            .should('have.value', '')       
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório', () => {
        cy.get('#firstName').type('Rangel Luiz')
        cy.get('#lastName').type('Bombonatto')
        cy.get('#email').type('rangel@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button','Enviar').click()
        
        cy.get('.error').should('to.be.visible')         
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Rangel Luiz')
            .should('have.value', 'Rangel Luiz' )
            .clear()
            .should('have.value', '' )
        cy.get('#lastName')
            .type('Bombonatto')
            .should('have.value', 'Bombonatto' )
            .clear()
            .should('have.value', '' )
        cy.get('#email')
            .type('rangel@exemplo.com')
            .should('have.value', 'rangel@exemplo.com' )
            .clear()
            .should('have.value', '' )
        cy.get('#phone')
            .type('48991874928')
            .should('have.value', '48991874928')  
            .clear()
            .should('have.value', '' )  
    })

    it('exibe mensagem de error ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button','Enviar').click()
        
        cy.get('.error').should('to.be.visible')  
    })

    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('to.be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) pelo seu valor', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
})