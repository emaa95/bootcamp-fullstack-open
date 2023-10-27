import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './utils/store'
import {BrowserRouter as Router} from 'react-router-dom' 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  
  <Router>
  <Provider store={store}>
    <App />
  </Provider>
  </Router>
)
