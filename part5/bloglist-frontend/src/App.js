import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import LoggedIn from "./components/LoggedIn";
import Togglable from "./components/Togglable";

const userKeyLS = "loggedInUser";
const timeoutTime = 5000;

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [msg, setMsg] = useState(null);
	const [color, setColor] = useState(null);

	const changeTogglableVisibility = useRef();

	const updateBlog = async (id) => {
		try 
		{
			const blogToUpdate = blogs.find(blog => blog.id === id); // There will be a matching blog id

			const updatedBlog = await blogService.updateBlog({...blogToUpdate, likes : blogToUpdate.likes + 1});
			setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog));
		}
		catch (err)
		{
			setMsg(err.response?.data?.error ? err.response.data.error : err.message);
			setColor("red");

			setTimeout(() => setMsg(null), timeoutTime);
		}
	};

	const handleBlogRemoval = async (blog) => {
		if (window.confirm(`Remove blog: ${blog.title} by ${blog.user.name}`))
		{
			try
			{
				await blogService.deleteBlog(blog.id);
				setBlogs(blogs.filter(b => b.id !== blog.id));

				setMsg(`Blog: ${blog.title} by ${blog.user.name} deleted successfully`);
				setColor("green");

				setTimeout(() => setMsg(null), timeoutTime); 
			}
			catch (err) 
			{
				setMsg(err.response?.data?.error ? err.response.data.error : err.message);
				setColor("red");

				setTimeout(() => setMsg(null), timeoutTime);   
			}
		}
	};

	const addBlog = async (e, obj) => {
		try 
		{
			e.preventDefault();

			if (!obj.title || !obj.url || !obj.author)
				throw new Error("mising title or url or author");

			const data = await blogService.addBlog({title : obj.title, author: obj.author, url : obj.url});

			setBlogs(blogs.concat(data));
			obj.setTitle("");
			obj.setAuthor("");
			obj.setUrl("");
			setMsg(`a new blog ${obj.title} by ${obj.author} added`);
			setColor("green");

			setTimeout(() => setMsg(null), timeoutTime);

			changeTogglableVisibility.current();
		}
		catch (err)
		{
			setMsg(err.response?.data?.error ? err.response.data.error : err.message);
			setColor("red");

			setTimeout(() => setMsg(null), timeoutTime);
		}
	};

	useEffect(() => {
		blogService.getAll().then(blogs => {
			setBlogs(blogs);
		});

		const val = window.localStorage.getItem(userKeyLS);

		if (val)
		{
			const userInLS = JSON.parse(val);
			setUser(userInLS);
			blogService.setToken(userInLS.token);
		}

	}, []);

	if (!user)
	{
		const loginFormEssentials = {setUser, setMsg, setColor};

		return (
			<div>
				<Notification msg = {msg} color = {color} />

				<LoginForm obj = {loginFormEssentials} />
			</div>
		);
	}

	const sortedBlogs = blogs.map(blog => blog).sort((a, b) => b.likes - a.likes); // Sorted in descending order

	return (
		<div>
			<Notification msg = {msg} color = {color} />

			<LoggedIn name = {user.name} setUser = {setUser} />

			<Togglable buttonLabel = "new note" ref = {changeTogglableVisibility}>
				<AddBlogForm addBlog = {addBlog} />
			</Togglable>

			<Blogs blogs = {sortedBlogs} updateBlog = {updateBlog} 
				currentUsername = {user.username} handleBlogRemoval = {handleBlogRemoval} />
		</div>
	);
};
 
export {App, userKeyLS, timeoutTime};