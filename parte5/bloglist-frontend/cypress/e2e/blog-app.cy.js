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

  describe.only('when logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'root', password: '1234' })
    })

    beforeEach(() => {
      cy.createBlog({
        title:'another test',
        author: 'root',
        url: 'www.test2.com',
        likes: 4,
      })
    });
    
    it('a new blog can be created', () => {
      cy.contains('new blog').click();

      cy.get('#title').type('test1');
      cy.get('#author').type('yo');
      cy.get('#url').type('www.test.com');
      cy.get('#likes').type(5);

      cy.get('#blog-button').click()

      cy.contains('test1 - yo')

    });

    it('user logged can remove a blog', () => {
      cy.contains('another test - root')
      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.get('#success').should('contain','Blog another test was successfully deleted')
      cy.get('#success').should('have.css', 'color', 'rgb(0, 128, 0)')
    });

    it('user who did not create the blog cannot remove it', () => {
      // Crear otro usuario y hacer login con ese usuario
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
        name: 'anotherUser',
        username: 'anotherUser',
        password: 'password123',
      });
      cy.login({ username: 'anotherUser', password: 'password123' });
  
      // Intentar eliminar el blog creado por 'root'
      cy.contains('another test - root');
      cy.contains('view').click();
      cy.get('#remove-button').click();
      cy.get('#error').should('contain','Cannot delete blog another test')
      cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
    

    describe('and a blog exists', function (){
      beforeEach(() => {
        cy.createBlog({
          title:'another test2',
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

      
      });
      
  })

  
})