

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    let likes = 0
    if (blogs.lenght === 1) {
        likes = blogs.likes
    } else {
        likes = blogs.reduce(function (sum, blog) {
            return blogs.lenght === 0
                ? 0
                : sum + blog.likes
        }, 0)
    }
    return likes
}
const favoriteBlog = (blogs) => {
    const likes = blogs.map(e => e.likes)
    const mostLikes = Math.max(...likes)
    return blogs.find(e => e.likes === mostLikes)
}
const mostBlogs = (blogs) => {
    const authors = []
    const authorsBlogs = []
    blogs.forEach(e => {
        if (!authors.includes(e.author)) {
            authors.push(e.author)
            authorsBlogs.push({ author: e.author, blogs: e.blogs })
        } else {
            authorsBlogs.forEach(e1 => {
                if (e1.author === e.author) {
                    e1.blogs += e.blogs
                }
            })
        }
    })
    const mostBlogs = Math.max(...authorsBlogs.map(o => o.blogs))
    return authorsBlogs.find(e => e.blogs === mostBlogs)
}
const mostLikes = (blogs) => {
    const authors = []
    const authorsLikes = []
    blogs.forEach(e => {
        if (!authors.includes(e.author)) {
            authors.push(e.author)
            authorsLikes.push({ author: e.author, likes: e.likes })
        } else {
            authorsLikes.forEach(e1 => {
                if (e1.author === e.author) {
                    e1.likes += e.likes
                }
            })
        }

    })
    
    const mostLikes = Math.max(...authorsLikes.map(o => o.likes))
    return authorsLikes.find(e => e.likes === mostLikes)
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}