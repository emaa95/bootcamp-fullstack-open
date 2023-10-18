import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    voteAnecdote: (state, action) => {
        const id = action.payload;
        const anecdoteToVote = state.find(a => a.id === id);
      
        if (anecdoteToVote){

            // Crea una copia actualizada de la anécdota con un voto más.
            const updateAnecdote = {
                ...anecdoteToVote,
                votes: anecdoteToVote.votes + 1
            };
            
            // Utiliza map para actualizar la anécdota en el estado original.
            return state.map (anecdote => 
                    anecdote.id === id ? updateAnecdote : anecdote
            );
        }
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
    updateVote: (state, action) => {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    }
  }
});

export const { appendAnecdote, setAnecdotes, updateVote } = anecdotesSlice.actions;

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
} 

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote= anecdote => {
  return async dispatch => {
    const updateAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch(updateVote(updateAnecdote))
  }
}
export default anecdotesSlice.reducer;