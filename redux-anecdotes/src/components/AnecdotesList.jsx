import { useDispatch, useSelector } from "react-redux";
import filteredAnecdotes from "../Selector/filteredSelector";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification} from "../reducers/notificationReducer";

 const Anecdote = ({anecdote, handleClick}) => {

    return (
        <li>
            {anecdote.content} has {anecdote.votes} votes
            <br />
            <button onClick={handleClick}>Vote</button>
        </li>
    )
 }

 const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(filteredAnecdotes)
    return (
        <ul>
            {anecdotes.map(anecdote => <Anecdote
                key = {anecdote.id}
                anecdote = {anecdote}
                handleClick = {() => {
                    dispatch (voteAnecdote(anecdote.id))
                    dispatch (setNotification(`You voted for: ${anecdote.content}`, 5)) 
                }}
            />
            )}
        </ul>
    )
 }

 export default Anecdotes;