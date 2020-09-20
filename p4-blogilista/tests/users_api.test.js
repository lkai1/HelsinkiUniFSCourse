
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        "username": "Matti123",
        "name": "Matti Niemi",
        "password": "32ij"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(initialUsers[0])
    await userObject.save()
})
test("incorrect user is not created", async () => {
    const newUser = {
        "name": "Matti Niemi",
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(405)
})
afterAll(() => {
    mongoose.connection.close()
})