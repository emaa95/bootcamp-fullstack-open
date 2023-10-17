import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

// La función asObject toma una cadena de anécdota y la convierte en un objeto con propiedades content, id y votes.
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// initialState es un arreglo de objetos de anécdotas, creado a partir de anecdotesAtStart usando la función asObject.
const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
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
    }
  }
});

export const { createAnecdote, voteAnecdote } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;