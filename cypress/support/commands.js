Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Rangel Luiz')
    cy.get('#lastName').type('Bombonatto')
    cy.get('#email').type('rangel@exemplo.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
})