describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('root')

      cy.contains('login').click()
      cy.contains('logout').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('roo')

      cy.contains('login').click()
      cy.contains('wrong credentials').should('be.visible')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'root', password: 'root'})
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('input[name="title"]').type('title')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')

      cy.contains("Create").click()
      cy.contains('title').should('be.visible')
    })

    it('A blog can be liked', function() {
      cy.contains('Create new blog').click()
      cy.get('input[name="title"]').type('title')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')
      cy.contains("Create").click()

      cy.contains('view').click()
      cy.get('like').click()
      cy.contains('2')
      
    })

    it('User that created blog can delete', function() {
      cy.contains('Create new blog').click()
      cy.get('input[name="title"]').type('del')
      cy.get('input[name="author"]').type('author')
      cy.get('input[name="url"]').type('url')
      cy.contains("Create").click()

      cy.contains('del author')
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('del author').should('not.exist')
    })
  })
  describe('Blogs are ordered by likes', function() {
    beforeEach(function() {
      cy.createBlog({title: 'title1', author: 'author', url: "url"})
      cy.createBlog({title: 'title2', author: 'author', url: "url"})
      cy.createBlog({title: 'title3', author: 'author', url: "url"})

      cy.contains('title1').parent().as('blog1')
      cy.contains('title2').parent().as('blog2')
      cy.contains('title3').parent().as('blog3')
    })

    it('ordered', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()

      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.wait(200)
      cy.get('@like3').click()
      cy.wait(200)
      cy.get('@like3').click()
      cy.wait(200)
      cy.get('.blog').then(blogs => {
        const likes = []
        blogs.each((index, blog) => {
          const count = parseInt(Cypress.$(blog).find('#likes').text(), 10)
          likes.push(count)
        })
      }).then(() => {
        const sortedLikes = [...likes].sort((a,b) => b - a)
        expect(likes).to.deep.equal(sortedLikes)
      }) 
    })
  })

})