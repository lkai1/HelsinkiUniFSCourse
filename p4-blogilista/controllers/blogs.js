const blogsRouter = require('express').Router()
const Blog = require('../models/blogpost')
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(blog => blog.toJSON()))
        })
})
blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).end()
    } else {
        blog
            .save()
            .then(result => {
                return response.status(201).json(result)
            })
    }
})

module.exports = blogsRouter