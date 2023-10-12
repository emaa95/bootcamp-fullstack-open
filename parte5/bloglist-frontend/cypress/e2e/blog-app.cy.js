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

  describe.only('the blogs are ordered by number of likes' , function(){
    beforeEach(() => { 
      cy.login({ username: 'root', password: '1234' })
      cy.createBlog({
        title:'another test4',
        author: 'root',
        url: 'www.test2.com',
        likes: 8,
      })
      cy.createBlog({
        title:'another test5',
        author: 'root',
        url: 'www.test2.com',
        likes: 3,
      })
      cy.createBlog({
        title:'another test6',
        author: 'root',
        url: 'www.test2.com',
        likes: 7,
      })

      cy.contains('another test4').parent().as('blog1')
      cy.contains('another test5').parent().as('blog2')
      cy.contains('another test6').parent().as('blog3')
    });
    
    it('they are ordered by number of likes', () => {
      cy.get('#blog').then(blogs => {
        cy.wrap(blogs[0]).contains(8)
        cy.wrap(blogs[1]).contains(7)
        cy.wrap(blogs[2]).contains(3)
      })
    });
    

    it.only('they are ordered by number of likes when the user clicks on like', () => {
      //cy.get('@blog1').contains('view').click()
      //cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      //cy.get('@blog1').contains('like').as('like1')
      //cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like3').click()
      cy.wait(500)
      cy.get('@like3').click()
      
      cy.get('#blog').then(blogs => {
        cy.wrap(blogs[0]).contains(9)
        cy.wrap(blogs[1]).contains(8)
        cy.wrap(blogs[2]).contains(3)

      })

    });
    
    
  })

  
})