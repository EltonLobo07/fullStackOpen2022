import { useState } from "react";

const Blog = ({ blog, updateBlog, currentUsername, handleBlogRemoval }) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display : visible ? "none" : " " };
	const showWhenVisible = { display : visible ? " " : "none" };

	const toggleVisibility = () => setVisible(!visible);

	const styles = { 
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5
	};

	return (
		<div style = {styles} className = "blog">
			<div style = {hideWhenVisible} className = "shortVersion">
				{blog.title}
				{" "}
				{blog.author}
				{" "}
				<button onClick = {toggleVisibility} className = "viewButton">view</button>
			</div>
			<div style = {showWhenVisible} className = "longVersion">
				{blog.title} <button onClick = {toggleVisibility}>hide</button>
				<br />
				{blog.url}
				<br />
				<span> 
					likes {blog.likes + " "} 
				</span>
				<button onClick = {() => updateBlog(blog.id)}>like</button>
				<br />
				{blog.user.name}
				<br />
				<div className = "removeButton">
					{blog.user.username === currentUsername ? <button onClick = {() => handleBlogRemoval(blog)}>remove</button> : null}
				</div>
			</div>
		</div>
	);
};

export default Blog;