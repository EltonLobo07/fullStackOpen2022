import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newObj => axios.post(baseUrl, newObj).then(response => response.data)

const deleteEntry = id => axios.delete(baseUrl + '/' + id) 

const update = (id, newObj) => axios.put(baseUrl + '/' + id, newObj).then(response => response.data)

const obj = {getAll, create, deleteEntry, update}

export default obj