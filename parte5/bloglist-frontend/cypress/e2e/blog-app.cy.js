describe('Blog app', function() {
  beforeEach(function() {
    // eslint-disable-next-line no-undef
    cy.request('POST', 'http://localhost:3003/api/testing/reset')  
    const user = { 
      name: 'root',      
      username: 'root',      
      password: '1234'    
    }    
    // eslint-disable-next-line no-undef
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('Login')
  })
})