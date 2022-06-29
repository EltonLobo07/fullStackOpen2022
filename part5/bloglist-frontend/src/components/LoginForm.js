import { useState } from "react";             
import { userKeyLS, timeoutTime } from "../App";           
import loginService from "../services/login";
import blogService from "../services/blogs";

const handleLogin = async (e, obj) => {
	try
	{
		e.preventDefault();

		if (!obj.username || !obj.password)
			throw new Error("missing username or password");

		const data = await loginService.login({username : obj.username, password : obj.password});

		window.localStorage.setItem(userKeyLS, JSON.stringify(data));
		blogService.setToken(data.token);
		obj.setUser(data);
		obj.setUsername("");
		obj.setPassword("");
	}
	catch (err)
	{
		obj.setMsg(err.response?.data?.error ? err.response.data.error : err.message);
		obj.setColor("red");

		setTimeout(() => obj.setMsg(null), timeoutTime);
	}
};

const LoginForm = ({ obj }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const loginFormStatesAndStateManipulators = {username, setUsername, password, setPassword};

	return (
		<>
			<h1>log in to application</h1>

			<form onSubmit = {e => handleLogin(e, {...loginFormStatesAndStateManipulators, ...obj})}>

				<label htmlFor = "usernameField">Username: </label>
				<input type = "text" id = "usernameField" value = {username} onChange = {e => setUsername(e.target.value)} />

				<br />

				<label htmlFor = "passwordField">Password: </label>
				<input type = "password" id = "passwordField" value = {password} onChange = {e => setPassword(e.target.value)} />

				<br />

				<button>login</button>

			</form>
		</>
	);
};

export default LoginForm;