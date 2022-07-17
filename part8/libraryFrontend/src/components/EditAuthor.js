import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const EditAuthor = ({ notify, authors }) => {
	const [name, setName] = useState(!authors.length ? "" : authors[0].name);
  	const [born, setBorn] = useState("");
  	const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query: ALL_AUTHORS}]});

  	if (!authors.length) // Won't display the form if no authors present
		return null;

  	const handleSubmit = e => {
	    e.preventDefault();

	    if (!name || !born)
	    {
	    	notify("Some fields are missing. Fill all of the input fields");
	    	return;
	    }

	    editAuthor({variables: {name, born: Number(born)}});
	    
	    setName("");
	    setBorn("");
  	};

	return (
		<div>
        <h3>Set birthyear</h3>
        <form onSubmit = {handleSubmit}>
          <label htmlFor = "name">Name: </label>
          <select id = "name" value = {name} onChange = {e => setName(e.target.value)}>
          	{authors.map(a => <option key = {a.name} value = {a.name}>{a.name}</option>)}
          </select>
          <br />
          <label htmlFor = "born">Born: </label>
          <input type = "number" id = "born" value = {born} onChange = {e => setBorn(e.target.value)} />
          <br />
          <button>update author</button>
        </form>
      </div>
	);
};

export default EditAuthor;