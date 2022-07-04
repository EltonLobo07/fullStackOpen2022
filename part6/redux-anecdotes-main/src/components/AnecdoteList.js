import { useDispatch, useSelector } from "react-redux";
import { updateAnecdoteAndDB } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, onClick }) => {
	return (
		<div>
			<div>
	            {anecdote.content}
	        </div>

	        <div>
	            has {anecdote.votes}
	            {" "}
	            <button onClick = {onClick}>vote</button>
	        </div>
		</div>	
	);
};

const AnecdoteList = () => {

	const dispatch = useDispatch();
	const anecdotesNotFiltered = useSelector(state => state.anecdotes);
	const filter = useSelector(state => state.filter);

	const anecdotes = anecdotesNotFiltered.filter(anecdote => anecdote.content.includes(filter));

	const buttonClicked = (id, content) => {
		dispatch(updateAnecdoteAndDB(id));

		dispatch(setNotification(`You voted: ${content}`, 5));
	};

	return (
		<>
	      	{anecdotes.map(anecdote => <Anecdote key = {anecdote.id} anecdote = {anecdote} onClick = {() => buttonClicked(anecdote.id, anecdote.content)} />)}
      	</>
	);
};

export default AnecdoteList;