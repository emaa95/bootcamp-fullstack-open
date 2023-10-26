import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'
import authReducer from '../reducers/authReducer'

const store = configureStore({
    reducer: {
        blog: blogReducer,
        notification: notificationReducer,
        user: userReducer,
        auth: authReducer        
    }
}
)

export default store