const blogsRouter = require('express').Router()
const Blog = require('../models/blogpost')
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs.map(blog => blog.toJSON()))
        })
})
blogsRouter.post('/', async (request, response) => {
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
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog.toJSON)
        })
    response.status(204).end()
})
module.exports = blogsRouter