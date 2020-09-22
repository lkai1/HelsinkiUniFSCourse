describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Person',
      username: 'person1',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginForm')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('person1')
      cy.get('#password').type('salainen')
      cy.get('#loginBtn').click()
      cy.contains('Person logged in')
    })

    it('fails with wrong credentials', function () {

      cy.get('#username').type('person1')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()

      cy.contains('wrong credentials')
    })
  })
})