import axios from "axios";

const baseUrl = "/api/login";

const login = (loginObj) => axios.post(baseUrl, loginObj).then(res => res.data);

const obj = { login };
export default obj;