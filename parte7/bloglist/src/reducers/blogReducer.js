import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIAL_BLOGS': 
            return action.data
        
        case 'NEW_BLOG': 
            return [...state, action.data]
        
        case 'UPDATE_BLOG':
            {
                const id = action.data.id
                const updatedBlog = state.find((blog) => blog.id === id)
                const changedBlog = {
                  ...updatedBlog,
                  likes: updatedBlog.likes + 1
                }
                return state.map((blog) => (blog.id !== id ? blog : changedBlog))
              }

        case 'REMOVE_BLOG': 
            return state.filter(blog => blog.id !== action.data);

        case 'ADD_COMMENT': 
        const id = action.data.id
        const updatedBlog = state.find((blog) => blog.id === id)
        const changedBlog = {
          ...updatedBlog,
          comments: action.data.comments
        }
        return state.map((blog) => (blog.id !== id ? blog : changedBlog))
        
        default:
            return state
    }
}

export const initialBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIAL_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (content) => {
    return async (dispatch) => {
    try {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    } catch (exception) {
        dispatch(setNotification(`error to create ${content.title}`, 'error' , 5  ))
    }
}
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try{
            const updateBlog = await blogService.update({
                ...blog,
                likes: blog.likes + 1 
            })
            dispatch({
                type: 'UPDATE_BLOG',
                data: updateBlog
            })
        } catch (exception) {
            dispatch(setNotification(`error to update ${blog.title}`, 'error', 5))
        }
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        try{
            await blogService.remove(id)
            dispatch({
                type: 'REMOVE_BLOG',
                data: id
            })
        } catch (exception){
            dispatch(setNotification(`error to delete blog`, 'error', 5))
        }
    }
}

export const comment = (blog, comment) => {
    return async (dispatch) => {
    try {
        const updateBlog = await blogService.update({
            ...blog,
            comments: blog.comments.concat([comment])
        })
        dispatch({
            type: 'ADD_COMMENT',
            data: updateBlog
        })    
    } catch (exception){
        dispatch(setNotification(`cannot update blog ${blog.title}`, 'error', 5))
    }
    }
}

export default blogReducer