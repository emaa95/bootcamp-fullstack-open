import userService from '../services/user'

const userReducer = (state = [], action) => {
    switch(action.type) {
        case 'INITIAL_USERS':
            return action.data
        
        default:
            return state
    }
}

export const initialUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch({
            type: 'INITIAL_USERS',
            data: users
        })
    }
}

export default userReducer