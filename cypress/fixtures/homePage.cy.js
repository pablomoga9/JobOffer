describe('login page',()=>{
    it('succesful loads',()=>{
        cy.visit('/login'||'https://jobscanner.herokuapp.com/login')
        cy.get('input[name=email]').type('moyagarcia99@gmail.com')
        cy.get('input[name=password]').type(process.env.PASSWORD)
        cy.get('form').submit()
        cy.getCookie('acces-token').should('exist')
    }) 

})