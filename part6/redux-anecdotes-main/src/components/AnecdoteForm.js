import { connect } from "react-redux";
import { reqAndCreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
		// const dispatch = useDispatch();
		
		const addAnecdote = e => {
    		e.preventDefault();

    		const content = e.target.onlyTextField.value;
    		e.target.onlyTextField.value = "";

    		props.reqAndCreateAnecdote(content);
    		props.setNotification(`You created anecdote: ${content}`, 5);
  		};

  		const style = {marginTop : 5, marginBottom : 20};

		return (
				<div style = {style}>
						<h2>create new</h2>

		     		 	<form onSubmit = {addAnecdote}>
		        			<div><input name = "onlyTextField" /></div>
		        			<br />
		        			<button>create</button>
		      			</form>
				</div>
		);
};

const mapDispatchToProps = dispatch => {
	const objToReturn = {
		reqAndCreateAnecdote: content => dispatch(reqAndCreateAnecdote(content)),
		setNotification: (msg, timeInSeconds) => dispatch(setNotification(msg, timeInSeconds))
	};

	return objToReturn;
};

const NewAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default NewAnecdoteForm;