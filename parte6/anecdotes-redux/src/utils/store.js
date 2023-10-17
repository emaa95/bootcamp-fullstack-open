import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './../reducers/anecdotesSlice'
import filterReducer from '../reducers/filterReducer'

const store = configureStore({
    reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
    }
}
)

export default store