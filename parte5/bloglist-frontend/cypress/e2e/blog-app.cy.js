describe('Blog app', function() {
  beforeEach(function() {
   
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)  
    const user = { 
      name: 'root',      
      username: 'root',      
      password: '1234'    
    }    
  
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
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

  describe('when logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'root', password: '1234' })
    })
    
    it('a new blog can be created', () => {
      cy.contains('new blog').click();

      cy.get('#title').type('test1');
      cy.get('#author').type('yo');
      cy.get('#url').type('www.test.com');
      cy.get('#likes').type(5);

      cy.get('#blog-button').click()

      cy.contains('test1 - yo')

    });

    describe('and a blog exists', function (){
      beforeEach(() => {
        cy.createBlog({
          title:'another test',
          author: 'root',
          url: 'www.test2.com',
          likes: 4,
        })
      });
      
      it('user can like a blog', () => {
        cy.contains('another test - root')
        cy.contains('view').click()
        cy.contains(4)
        cy.get('#likes-button').click()
        cy.contains(5)
      });
      
    })
  })

  
})