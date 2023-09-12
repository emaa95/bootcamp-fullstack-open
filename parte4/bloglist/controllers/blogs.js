const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await 
    Blog.find({}).populate('user', {username: 1 , name: 1})
    
    response.json(blogs)
    
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = await User.findById(body.userId)

    if (!user) {
        // El usuario no fue encontrado en la base de datos, puedes enviar un mensaje de error o manejarlo de acuerdo a tus necesidades.
        return response.status(404).json({ error: 'Usuario no encontrado' });
    }
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    }
    )

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body 

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    .then(updateBlog => {
        response.json(updateBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter