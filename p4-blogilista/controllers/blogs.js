const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogpost')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('users')

    response.json(blogs.map(blog => blog.toJSON()))
})
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.likes === undefined) {
        body.likes = 0
    }
    if (body.title === undefined || body.url === undefined) {
        return response.status(400).json({
            error: 'title or url missing'
        })
    } else {
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user
        })
        user.blogs = user.blogs.concat(blog.id)
        const savedBlog = await blog.save()
        await user.save()

        response.json(savedBlog.toJSON())
    }
})
blogsRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = user.blogs.find(e => e === request.params.id)
    if (blog !== undefined) {
        await Blog.findByIdAndRemove(decodedToken.id)
        user.blogs.remove(request.params.id)
        await user.save()
    }
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