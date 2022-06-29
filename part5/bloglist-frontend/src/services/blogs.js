import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
	token = newToken;
};

const getAll = () => axios.get(baseUrl).then(res => res.data);

const addBlog = blogObj => {
	const config = { headers: { Authorization : `Bearer ${token}` } };

	return axios
		.post(baseUrl, blogObj, config)
		.then(res => axios.get(baseUrl + "/" + res.data.id))
		.then(finalRes => finalRes.data);
};

const updateBlog = blogObj => {
	const config = { headers: { Authorization : `Bearer ${token}` } };

	return axios.put(baseUrl + "/" + blogObj.id, blogObj, config).then(res => res.data);
};

const deleteBlog = blogId => {
	const config = { headers: { Authorization : `Bearer ${token}` } };
	
	return axios.delete(baseUrl + "/" + blogId, config);
};

const obj = { getAll, addBlog, updateBlog, deleteBlog, setToken };
export default obj;