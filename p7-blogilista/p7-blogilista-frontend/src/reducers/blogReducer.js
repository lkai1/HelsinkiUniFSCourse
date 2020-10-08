


const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALBLOGS':
            return state = action.data
        case 'NEWBLOG':
            return state = state.concat(action.data)
        case 'LIKEBLOG':
            return state = action.data
        case 'REMOVEBLOG':
            return state = action.data
        default: return state
    }
}
export const initialBlogs = (blogs) => {
    return {
        type: 'INITIALBLOGS',
        data: blogs
    }
}
export const addBlog = (blog) => {
    return {
        type: 'NEWBLOG',
        data: blog
    }
}
export const likeBlog = (blogs) => {
    const blogsCopy = blogs.concat()
    return {
        type: 'LIKEBLOG',
        data: blogsCopy
    }
}
export const removeBlog = (blogs, blogToRemove) => {
    const blogsCopy = blogs.concat()
    const blogsWDel = blogsCopy.filter(b => b.id !== blogToRemove.id)
    console.log(blogsWDel)
    return {
        type: 'REMOVEBLOG',
        data: blogsWDel
    }
}
export default blogReducer