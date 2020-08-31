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
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
})
test('right amount of JSON blogs', async () => {
    const response = await api.get('/api/blogposts')
    expect(response.body).toHaveLength(1)
})
test('id variable in object named "id"', async () => {
    const response = await api.get('/api/blogposts')
    expect(response.body[0].id).toBeDefined()
})
test('can add blogs to /api/blogs', async () => {
    const newBlog = {
        title: "UnInteresting",
        author: "MeMyselfAndYou",
        url: "randomUrl2",
        likes: -8
    }
    await api
        .post('/api/blogposts')
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogposts')
    expect(response.body).toHaveLength(2)
})
test('if likes undefined it has value 0', async () => {
    const newBlog = {
        title: "UnInteresting",
        author: "MeMyselfAndYou",
        url: "randomUrl2",
    }
    await api
        .post('/api/blogposts')
        .send(newBlog)
    const response = await api.get('/api/blogposts')
    expect(response.body[1].likes).toBe(0)
})
test('400 if blogpost does not have title and url', async () => {
    const newBlog = {
        author: "MeMyselfAndYou",
        likes: -8
    }
    await api
        .post('/api/blogposts')
        .send(newBlog)
        .expect(400)
})
afterAll(() => {
    mongoose.connection.close()
})