import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
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
    }
  }
});

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;