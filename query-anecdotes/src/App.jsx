import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createAnecdote, updateAnecdote } from './components/requests/requests'
import { useNotificationDispatch } from './components/contexts/NotificationContext'

const App = () => {

const queryClient = useQueryClient()
const dispatchNotification = useNotificationDispatch()

const voteAnecdoteMutation = useMutation({
  mutationFn: ({ id, anecdote }) => updateAnecdote(id, anecdote),
  onSuccess: (updateAnecdote) => {
    queryClient.invalidateQueries(['anecdotes'])
      dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: `Anecdote '${updateAnecdote.content}' voted`
    })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }
})
  const handleVote = (id) => {
    const anecdote = queryClient.getQueryData(['anecdotes']).find(anecdote => anecdote.id === id)
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log(votedAnecdote)
    voteAnecdoteMutation.mutate({ id, anecdote: votedAnecdote })
  }

  const result = useQuery ({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: `Anecdote '${newAnecdote.content}' created`
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      // Notificación de error
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: error.message
      })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  if(result.isLoading) {
    return <div>Loading data...</div>
  }
  
  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
