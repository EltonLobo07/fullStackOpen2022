import { createSlice } from "@reduxjs/toolkit";
import { getAll, getOne, addAnecdote, changeAnecdote } from "../services/anecdotes";

/*
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = anecdotesAtStart.map(asObject);

export const updateAnecdote = id => {
  return {type : "UPDATE_ANECDOTE", data : {id}};
};

export const createAnecdote = content => {
  return {type : "NEW_ANECDOTE", data : {id : getId(), votes : 0, content}};
};

const reducer = (state = initialState, action) => {
  switch (action.type)
  {
    case "UPDATE_ANECDOTE":
      const newState = state.map(anecdote => {
        return {...anecdote};
      }); 

      const anecdoteToChange = newState.find(obj => obj.id === action.data.id);
      anecdoteToChange.votes++;
      newState.sort((a, b) => b.votes - a.votes);
      return newState;

    case "NEW_ANECDOTE":
        return [...state, action.data];

    default: 
      return state;
  };
};

export default reducer;
*/

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdote: function(state, action) {
      const newState = state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote);
      newState.sort((a, b) => b.votes - a.votes);
      return newState;
    },

    createAnecdote: function(state, action) {
      state.push(action.payload);
    }, 

    setAnecdotes: function(state, action) {
      return action.payload;
    }
  } 
});

export default anecdoteSlice.reducer;
export const { createAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return ((dispatch, getState) => {
    getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }); 
};

export const reqAndCreateAnecdote = content => {
  const funcToReturn = (dispatch, getState) => {
    addAnecdote(content).then(newAnecdote => 
      { 
        dispatch(createAnecdote(newAnecdote));
      }
    );
  };

  return funcToReturn; 
};

export const updateAnecdoteAndDB = id => {
  const funcToReturn = async (dispatch, getState) => {
    const anecdoteToChange = await getOne(id);
    anecdoteToChange.votes++;
    const changedAnecdote = await changeAnecdote(id, anecdoteToChange);
    dispatch(updateAnecdote(changedAnecdote));
  };

  return funcToReturn;
};

export const setNotification = () => {
  
};