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
        cy.get('#phone-checkbox').check()
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

    it('seleciona um produto (Blog) pelo seu indice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos os checkboxs, depois desmarca o ultimo', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
            
    })

    it('selecione um arquivo na pasta fixture', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    // simulando como se tivesse arrastando o arquivo para o componente
    it('selecione um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]')
            .selectFile('@samplefile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a politica de privacidade abre em outra abra sem necessidade de clique', () => {
        // todo link que abre em uma nova aba vai ter a propriedade target com o valor _blank
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        // o cypress não trabalha com abas diferentes, removento a propriedade será aberto na mesma aba o link
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})