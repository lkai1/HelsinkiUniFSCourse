describe.only('When logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Person',
      username: 'person1',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.get('#username').type('person1')
    cy.get('#password').type('salainen')
    cy.get('#loginBtn').click()
  })

  it('A blog can be created', function () {
    cy.contains('create').click()
    cy.get('#title').type('test')
    cy.get('#author').type('test')
    cy.get('#url').type('test')
    cy.get('#create').click()
    cy.get('#blogs')
  })
  it('A blog can be liked', function () {
    cy.contains('create').click()
    cy.get('#title').type('test')
    cy.get('#author').type('test')
    cy.get('#url').type('test')
    cy.get('#create').click()
    cy.get('#showBlog').click()
    cy.get('#likeBtn').click()
  })
  it('A blog can be deleted', function () {
    cy.contains('create').click()
    cy.get('#title').type('test')
    cy.get('#author').type('test')
    cy.get('#url').type('test')
    cy.get('#create').click()
    cy.get('#showBlog').click()
    cy.get('#deleteBtn').click()
  })
  it('blogs are arranged by likes', function () {
    cy.contains('create').click()
    cy.get('#title').type('test')
    cy.get('#author').type('test')
    cy.get('#url').type('test')
    cy.get('#create').click()
    cy.get('#showBlog').click()
    cy.get('#likeBtn').click()
    cy.get('#title').type('test1')
    cy.get('#author').type('test1')
    cy.get('#url').type('test1')
    cy.get('#create').click()
    cy.get('#notShownBlog').then(e => {
      const likesArray = []
      e[0].children[2].childNodes.forEach(e => {
        const text = e.textContent.split(' ')
        likesArray.push(text[1])
      })
      console.log(likesArray)
    })
  })
})

