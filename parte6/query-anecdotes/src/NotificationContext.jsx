// NotificationContext.js
import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  message: null,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { message: action.message };
    case 'HIDE_NOTIFICATION':
      return { message: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', message });

    const hideTimer = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION'})
    }, 5000)

    return () => clearTimeout(hideTimer);
  };

  return (
    <NotificationContext.Provider
      value={{ ...state, showNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext