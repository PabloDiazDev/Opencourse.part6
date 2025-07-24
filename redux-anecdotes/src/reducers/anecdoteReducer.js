import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdoteServices'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})



export const { appendAnecdote, setNotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setNotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteServices.getById(id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    const updatedAnecdote = await anecdoteServices.update(id, changedAnecdote)
    const allAnecdotes = await anecdoteServices.getAll()
    dispatch(setNotes(allAnecdotes))
  }
}

export default anecdoteSlice.reducer