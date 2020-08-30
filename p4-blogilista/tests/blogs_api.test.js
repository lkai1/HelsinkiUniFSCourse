const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogpost')
const initialBlogs = [
    {
        "title": "Interesting",
        "author": "MeMyselfAndI",
        "url": "randomUrl",
        "likes": 8,
    }
]
beforeAll(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
})
test('right amount of JSON blogs', async () => {
    const response = await api.get('/api/blogposts')
    console.log(response.body)
    expect(response.body).toHaveLength(1)
})
test('id variable in object named "id"', async () => {
    const response = await api.get('/api/blogposts')
    expect(response.body[0].id).toBeDefined()
})
afterAll(() => {
    mongoose.connection.close()
})