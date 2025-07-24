import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { setNotification} from "../reducers/notificationReducer";
import anecdoteServices from "../services/anecdoteServices";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdoteContent.value;
        event.target.anecdoteContent.value = '';
        const anecdoteNew = await anecdoteServices.create({content, votes: 0});
        dispatch(appendAnecdote(anecdoteNew));
        dispatch(setNotification(`You added: ${content}`, 5)); 
    }
    return (
        <div>
            <form onSubmit={addAnecdote}>
                <h2>Create New Anecdote</h2>
                <input
                    type="text"
                    placeholder="Enter anecdote content"
                    name="anecdoteContent"
                    />
                    <button type="submit">Add Anecdote</button>
            </form>
        </div>
    )
}

export default AnecdoteForm