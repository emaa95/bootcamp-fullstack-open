import {createSlice} from '@reduxjs/toolkit'

const notificationReducer = createSlice (
    {
        name: 'notification',
        initialState: null,
        reducers: {
            setNotification: (state, action) => {
                return action.payload
            },
            hideNotification: (state) => null

            
        }
    }

)

export const { setNotification, hideNotification } = notificationReducer.actions;

export const setNotificationWithTimeout = (notification, displayTime) => (dispatch) => {
    dispatch(setNotification(notification));
  
    setTimeout(() => {
      dispatch(hideNotification());
    }, displayTime * 1000);
  };
  
export default notificationReducer.reducer;