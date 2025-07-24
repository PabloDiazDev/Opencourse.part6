import AnecdoteForm from './components/AnecdoteForm.jsx'
import Anecdotes from './components/AnecdotesList.jsx'
import AnecdoteFilter from './components/FilterForm.jsx'
import Notification from './components/Notification.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeAnecdotes } from './reducers/anecdoteReducer.js'



const App = () => {
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(initializeAnecdotes())
}, [])
  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <Anecdotes />
      <AnecdoteForm />
    </>
  )
}

export default App