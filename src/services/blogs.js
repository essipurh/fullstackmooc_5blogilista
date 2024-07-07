import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))
  return `Bearer ${user.token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const token = getToken()
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (objectId, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${objectId}`, updatedObject)
  return response.data
}

const remove = async (objectId) => {
  const token = getToken()
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${objectId}`, config)
  return response.data
}

export default { getAll, create, update, remove }