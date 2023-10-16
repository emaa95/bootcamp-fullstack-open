import { createSlice } from '@reduxjs/toolkit';

const filterReducer = createSlice(
    {
        name: 'filter',
        initialState: null,
        reducers: {
            filter: (state, action) => {
                return action.payload;
            }
        }
    }
)

export const { filter } = filterReducer.actions;

export default filterReducer.reducer;