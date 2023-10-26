const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.data

        case 'HIDE_NOTIFICATION':
            return action.data
        
        default:
            return state
    }
}

export const setNotification = (
    notification, 
    typeNotification,
    displayTime
) => {
    return async (dispatch) => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            data: {
                message: notification,
                type: typeNotification
            }
        })

        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION',
                data: null
            })
        }, displayTime * 1000)
    }
}

export default notificationReducer