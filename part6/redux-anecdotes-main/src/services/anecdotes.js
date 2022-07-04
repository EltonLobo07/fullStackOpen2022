import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const getOne = async (id) => {
	const res = await axios.get(baseUrl + "/" + id);
	return res.data;
}

const addAnecdote = async (content) => {
	const res = await axios.post(baseUrl, {content, votes: 0});
	return res.data;
};

const changeAnecdote = async (id, obj) => {
	const res = await axios.put(baseUrl + "/" + id, obj);
	return res.data;
};

export {getAll, getOne, addAnecdote, changeAnecdote};