import { useState } from "react";

const AddBlogForm = ({ addBlog }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	return (
		<>
			<h2>create new</h2>

			<form onSubmit = {e => addBlog(e, {title, setTitle, author, setAuthor, url, setUrl})}>

				<label htmlFor = "title">Title:</label>
				<input type = "text" id = "title" value = {title} onChange = {e => setTitle(e.target.value)} />

				<br />

				<label htmlFor = "author">Author:</label>
				<input type = "text" id = "author" value = {author} onChange = {e => setAuthor(e.target.value)} />

				<br />

				<label htmlFor = "Url">Url:</label>
				<input type = "url" id = "url" value = {url} onChange = {e => setUrl(e.target.value)} />

				<br />

				<button type = "submit">create</button>

			</form>
		</>
	);
};

export default AddBlogForm;