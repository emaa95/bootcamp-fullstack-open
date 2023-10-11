describe('Blog app', function() {
  beforeEach(function() {
   
    cy.request('POST', 'http://localhost:3003/api/testing/reset')  
    const user = { 
      name: 'root',      
      username: 'root',      
      password: '1234'    
    }    
  
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('1234')
      
      cy.get('#login-button').click()

      cy.contains('root logged in')
    })

    it('fail with wrong credentials', function(){
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      
      cy.get('#login-button').click()

      cy.get('#error').should('contain', 'Wrong credentials')
      cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})