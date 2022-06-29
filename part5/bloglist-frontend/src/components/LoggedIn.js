import { userKeyLS } from "../App";
import blogService from "../services/blogs";

const handleLogOut = setUser => {
	window.localStorage.removeItem(userKeyLS);
	blogService.setToken(null);
	setUser(null);
};

const LoggedIn = (props) => <p>{props.name} logged in <button onClick = {() => handleLogOut(props.setUser)}>log out</button></p>;

export default LoggedIn;